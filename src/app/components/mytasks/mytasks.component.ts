import { Component, OnInit } from '@angular/core';
import { WorkTask, WorkTaskService } from '../worktask/worktask.service';
import { CommonModule } from '@angular/common';
import { MyTasksService } from './mytasks.service';
import { AuthService } from '../../services/auth.service';

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
    private workTaskService: WorkTaskService,
    private taskActionService: MyTasksService,
    private authService: AuthService
  ) {}

 ngOnInit() {
  const workerCode = this.authService.getWorkerCode();
  console.log('Token-dən alınan workerCode:', workerCode);

  if (!workerCode) {
    console.error('WorkerCode tapılmadı!');
    return;
  }

  this.workTaskService.getTasksByWorkerCode().subscribe({
    next: (tasks) => {
      this.tasks = tasks.map(t => ({
        ...t,
        status: t.status
      }));
      console.table(this.tasks.map(t => ({ id: t.id, name: t.name, status: t.status })));
    },
    error: (err) => console.error('Tasklar alınarkən xəta:', err)
  });
 }


  startTask(task: WorkTask) {
    this.taskActionService.startTask(task.id).subscribe({
      next: () => {
        this.tasks.forEach(t => {
          if (t !== task && (t.status === 0 || t.status === 1)) {
            t.status = 2;
          }
        });
        task.status = 1;
        this.tasks= [...this.tasks];
        console.log('After start:', task);
      },
      error: err => console.error('Start zamanı xəta:', err)
    });
  }

  pauseTask(task: WorkTask) {
    if (task.status === 1) {
      this.taskActionService.pauseTask(task.id).subscribe({
        next: () => {
          task.status = 2;
          console.log('After pause:', task);
        },
        error: err => console.error('Pause zamanı xəta:', err)
      });
    }
  }

  continueTask(task: WorkTask) {
    if (task.status === 2) {
      this.taskActionService.continueTask(task.id).subscribe({
        next: () => {
          this.tasks.forEach(t => {
            if (t !== task && (t.status === 0|| t.status === 1)) {
              t.status = 0;
            }
          });
          task.status = 1;
          console.log('After continue:', task);
        },
        error: err => console.error('Continue zamanı xəta:', err)
      });
    }
  }

  completeTask(task: WorkTask) {
    this.taskActionService.completeTask(task.id).subscribe({
      next: () => {
        task.status = 3;
        console.log('After complete:', task);
      },
      error: err => console.error('Complete zamanı xəta:', err)
    });
  }
}
