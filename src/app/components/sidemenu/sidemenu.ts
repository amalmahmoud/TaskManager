import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TaskFormComponent } from '../task-form/task-form';
import { MenuItem, MenuItemModel } from './sidemenu.model';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../tasks/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { LayoutService } from '../../core/services/layout.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './sidemenu.html',
  standalone: true,
  imports: [MenuModule, Button, CommonModule, TaskFormComponent, RouterLink, RouterLinkActive],
})
export class SideMenuComponent {
  private router = inject(Router);
  private taskService = inject(TaskService);
  private notifyService = inject(NotificationService);
  layoutService = inject(LayoutService);
  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  menuItems = signal<MenuItemModel[]>(MenuItem);

  handleAddTask(taskData: Task) {
    this.taskService.addNewTask(taskData).subscribe({
      next: () => {
        this.notifyService.success('Task added successfully');
      },
      error: () => {
        this.notifyService.error('Task failed to be Added');
      },
    });
  }
}
