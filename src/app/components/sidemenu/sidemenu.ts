import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TaskFormComponent } from '../task-form/task-form';
import { MenuItem, MenuItemModel } from './sidemenu.model';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../tasks/task.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-side-menu',
  templateUrl: './sidemenu.html',
  standalone: true,
  imports: [MenuModule, Button, CommonModule, TaskFormComponent,RouterLink,RouterLinkActive],
})
export class SideMenuComponent implements OnInit {
  private router = inject(Router);
  private taskService = inject(TaskService);

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );


  menuItems: MenuItemModel[] = [];
  ngOnInit() {
    this.menuItems = MenuItem;
  }

  handleAddTask(taskData: Task) {
    this.taskService.addNewTask(taskData).subscribe({
      next: (task) => {
        console.log('Task added:', task);
        //  this.notify('success', 'Success', 'Task added successfully');
      },
      error: (err) => {
        console.error('Error adding task:', err);
        //  this.notify('error', 'Error', 'Task failed to be Added');
      },
    });
  }
}
