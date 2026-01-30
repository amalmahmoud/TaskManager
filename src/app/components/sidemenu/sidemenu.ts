import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskService } from '../../core/services/task.service';
import { MenuItem, MenuItemModel } from './sidemenu.model';
import { Task } from '../../core/models/task.model';
@Component({
  selector: 'app-side-menu',
  templateUrl: './sidemenu.html',
  standalone: true,
  imports: [MenuModule, Button, CommonModule, TaskFormComponent],
})
export class SideMenuComponent implements OnInit {
  private router = inject(Router);
  private taskService = inject(TaskService);

  menuItems: MenuItemModel[] = [];
  activeTab = signal('dashboard');
  ngOnInit() {
    this.menuItems = MenuItem;
  }

  selectTab(id: string) {
    this.activeTab.set(id);
    this.router.navigate([`/${id}`]);
  }
   handleAddTask(taskData: Task) {
     console.log(taskData)
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
