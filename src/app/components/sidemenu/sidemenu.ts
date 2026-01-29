import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskService } from '../../core/services/task.service';
import { MenuItem, MenuItemModel } from './sidemenu.model';
@Component({
  selector: 'app-side-menu',
  templateUrl: './sidemenu.html',
  standalone: true,
  imports: [MenuModule,Button,CommonModule,TaskFormComponent
  ],
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
  onHandleNewTask(task:any)
  {
    this.taskService.saveTask(task);
  }
}

