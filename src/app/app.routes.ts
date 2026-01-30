import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tasks',
        loadComponent: () =>
          import('./components/tasks/tasks').then((c) => c.TasksComponent),
      },
    ],
  },
];
