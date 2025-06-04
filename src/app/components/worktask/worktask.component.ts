import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTaskService, WorkTask } from './worktask.service';
import { WorkerService, Worker } from '../workers/worker.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worktask',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worktask.component.html',
  styleUrls: ['./worktask.component.css'],
  providers: [WorkTaskService, WorkerService]
})
export class WorktaskComponent implements OnInit {
  worktasks: WorkTask[] = [];
  allTasks: WorkTask[] = [];
  workers: Worker[] = [];
  editingIndex: number | null = null;
  validationErrors: string[] = [];
  searchTerm: string = '';
  workerId: number | null=null;

  showWorkerSelector: boolean = false;
  selectedTaskIndex: number | null = null;

  constructor(
    private workTaskService: WorkTaskService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.loadWorkers();
    this.loadTasks();
  }

  loadWorkers(): void {
    this.workerService.getWorkers().subscribe((data: Worker[]) => {
      this.workers = data;
    });
  }

  loadTasks(): void {
    this.workTaskService.getWorkTasks().subscribe((data: WorkTask[]) => {
      this.allTasks = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.worktasks = this.allTasks.filter(task =>
      task.name.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
    );
  }

  addTask(): void {
    const newTask: WorkTask = { id: 0, name: '', description: '', workerId: null };
    this.worktasks.unshift(newTask);
    this.editingIndex = 0;
  }

  editTask(index: number): void {
    this.editingIndex = index;
  }

  cancelEdit(index: number): void {
    this.editingIndex = null;
    this.loadTasks();
  }

  saveTask(index: number): void {
    const task = this.worktasks[index];

    this.validationErrors = [];
    if (!task.name || task.name.trim() === '') {
      this.validationErrors.push('Name field cannot be empty.');
    }
    if (!task.description || task.description.trim() === '') {
      this.validationErrors.push('Description field cannot be empty.');
    }
    if (this.validationErrors.length > 0) {
      return;
    }

    if (task.id === 0) {
      this.workTaskService.addWorkTask(task).subscribe(() => {
        this.loadTasks();
        this.editingIndex = null;
      });
    } else {
      this.workTaskService.updateWorkTask(task).subscribe(() => {
        this.loadTasks();
        this.editingIndex = null;
      });
    }
  }

  deleteTask(task: WorkTask): void {
    if (confirm('Are you sure?')) {
      this.workTaskService.deleteWorkTask(task.id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  clearValidationErrors(): void {
    this.validationErrors = [];
  }

  getWorkerFullName(workerId: number | null): string {
    if (!workerId) return '';
    const worker = this.workers.find(w => w.id === workerId);
    return worker ? `${worker.name} ${worker.surname}` : 'Unknown Worker';
  }

  selectWorkerForTask(index: number): void {
    this.selectedTaskIndex = index;
    this.showWorkerSelector = true;
  }

  assignWorker(worker: Worker): void {
    if (this.selectedTaskIndex !== null) {

    this.worktasks[this.selectedTaskIndex].workerId = worker.id ?? null;
    this.saveTask(this.selectedTaskIndex);

      
      
      this.showWorkerSelector = false;
      this.selectedTaskIndex = null;
    }
  }

  closeWorkerSelector(): void {
    this.showWorkerSelector = false;
    this.selectedTaskIndex = null;
  }

  calculateAge(birthDateString: string | null): number | null {
    if (!birthDateString) return null;
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
