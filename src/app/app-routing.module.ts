import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'workers',
    loadComponent: () =>
      import('./components/workers/workers.component').then(m => m.WorkersComponent)
  },
  {
    path: 'worktasks',
    loadComponent: () =>
      import('./components/worktask/worktask.component').then(m => m.WorktaskComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
