import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', 
        pathMatch: 'full', 
        redirectTo: 'dashboard' 
      },
      {
        path: 'dashboard',
        title: 'Dashboard | Task Manager',
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent),
      },
      {
        path: 'tasks',
        title: 'Tasks | Task Manager',
        loadComponent: () => import('./components/tasks/tasks').then(m => m.TasksComponent),
      },
    ],
  }
];
