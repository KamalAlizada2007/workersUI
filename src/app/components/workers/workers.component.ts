import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkerService } from './worker.service';

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workers: any[] = [];
  filteredWorkers: any[] = [];

  salaryFilter: number | null = null;
  experienceFilter: number | null = null;
  ageFilter: number | null = null;  

  editingIndex: number | null = null;

  constructor(private workerService: WorkerService) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  loadWorkers() {
    this.workerService.getWorkers().subscribe(data => {
      this.workers = data;
      this.filteredWorkers = [...data];
    });
  }

  editWorker(index: number): void {
    this.editingIndex = index;
  }

  saveWorker(index: number): void {
    this.editingIndex = null;
    
    let worker = this.filteredWorkers[index];
    this.workerService.update(worker).subscribe(() => {
      this.loadWorkers();
    });
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  deleteWorker(worker: any): void {
    if (!confirm(`Delete ${worker.name} ${worker.surname}?`)) return;
    
    this.workerService.delete(worker.id).subscribe(() => {
      this.loadWorkers();
    });

  }

  // Yardımçı funksiya: Doğum tarixindən yaş hesabla
  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  applyFilters(): void {
    this.filteredWorkers = this.workers.filter(worker => {
      const salaryOk = this.salaryFilter == null || worker.salary >= this.salaryFilter;
      const experienceOk = this.experienceFilter == null || worker.workExperienceYears >= this.experienceFilter;
      const ageOk = this.ageFilter == null || this.calculateAge(worker.dateOfBirth) >= this.ageFilter!;
      return salaryOk && experienceOk && ageOk;
    });
  }

  resetFilters(): void {
    this.salaryFilter = null;
    this.experienceFilter = null;
    this.ageFilter = null;
    this.filteredWorkers = [...this.workers];
  }
}
