import { Component, OnInit } from '@angular/core';
import { WorkTask, WorkTaskService } from '../worktask/worktask.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mytasks',
  standalone: true,
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css'],
  imports: [CommonModule]
})
export class MyTasksComponent implements OnInit {
  tasks: WorkTask[] = [];

  constructor(
    private workTaskService: WorkTaskService
  ) { }

  ngOnInit() {
    this.workTaskService.getTasksByWorkerCode().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('Tasklar alınarkən xəta:', err)
    });
  }

  onAction(task: WorkTask) {
    // Hazırda boşdur, sonra lazım olsa funksionallıq əlavə edərik
    console.log('Action clicked for task:', task);
  }
}
