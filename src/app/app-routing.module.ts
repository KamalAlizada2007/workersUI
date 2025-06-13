// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'workers',
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },  
    loadComponent: () =>
      import('./components/workers/workers.component').then(m => m.WorkersComponent)
  },
  {
    path: 'worktasks',
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'Worker'] }, 
    loadComponent: () =>
      import('./components/worktask/worktask.component').then(m => m.WorktaskComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { roles: ['Worker'] }, 
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'mytasks',
    canActivate: [AuthGuard],
    data: { roles: ['Worker'] },
    loadComponent: () =>
      import('./components/mytasks/mytasks.component').then(m => m.MyTasksComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(m => m.RegisterComponent)
  },

  {path: 'users', component: UsersComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
