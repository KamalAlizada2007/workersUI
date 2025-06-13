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
  validationErrors: string[] = [];

  showWorkerSelector: boolean = false;
  selectedTaskIndex: number | null = null;  
  private originalWorker: any = null;

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
    this.originalWorker = { ...this.filteredWorkers[index] };
    this.validationErrors = [];
  }

  saveWorker(index: number): void {
    this.validationErrors = [];

    let worker = this.filteredWorkers[index];

    if (!worker.name || worker.name.trim() === '') {
      this.validationErrors.push('Name is required.');
    }
    if (!worker.surname || worker.surname.trim() === '') {
      this.validationErrors.push('Surname is required.');
    }
    if (worker.salary == null || worker.salary <= 0) {
      this.validationErrors.push('Salary must be greater than zero.');
    }
    if (worker.workExperienceYears == null || worker.workExperienceYears < 0) {
      this.validationErrors.push('Experience must be zero or greater.');
    }
    if (worker.workerCode && typeof worker.workerCode !== 'string') {
      this.validationErrors.push('Invalid worker code.');
    }

    if (this.validationErrors.length > 0) {
      return;
    }

    this.editingIndex = null;

    if (worker.id) {
      this.workerService.update(worker).subscribe(() => {
        this.loadWorkers();
      });
    } else {
      this.workerService.add(worker).subscribe(() => {
        this.loadWorkers();
      });
    }
  }

  cancelEdit(index: number): void {
    this.editingIndex = null;

    if (this.originalWorker) {
      this.filteredWorkers[index] = this.originalWorker;
      this.originalWorker = null;
    }

    if (!this.filteredWorkers[index].id) {
      this.filteredWorkers.splice(index, 1);
      this.workers = [...this.filteredWorkers];
    }

    this.validationErrors = [];
  }

  deleteWorker(worker: any): void {
    if (!confirm(`Delete ${worker.name} ${worker.surname}?`)) return;

    this.workerService.delete(worker.id).subscribe(() => {
      this.loadWorkers();
    });
  }

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

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addWorker(): void {
    if (this.editingIndex !== null) {
      this.validationErrors = ['Please save or cancel the current editing worker first.'];
      return;
    }

    const newWorker = {
      name: '',
      surname: '',
      salary: 0,
      workExperienceYears: 0,
      dateOfBirth: new Date().toISOString().substring(0, 10),
      workerCode: null
    };

    this.validationErrors = [];
    this.workers.unshift(newWorker);
    this.filteredWorkers = [...this.workers];
    this.editingIndex = 0;
  }

  clearValidationErrors(): void {
    this.validationErrors = [];
  }

  openWorkerSelector(taskIndex: number | null = null): void {
    this.showWorkerSelector = true;
    this.selectedTaskIndex = taskIndex;
  }

  closeWorkerSelector(): void {
    this.showWorkerSelector = false;
    this.selectedTaskIndex = null;
  }

  assignWorker(worker: any): void {
    if (this.selectedTaskIndex !== null) {
      this.closeWorkerSelector();
    }
  }
}
