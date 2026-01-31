import { Component, computed, input, output, signal } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { FirstNamePipe } from '../../../shared/pipes/first-name.pipe';
import { calculateDueDateStatus, SEVERITY_MAP } from '../../../shared/utilitis/general-utilitis';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.html',
  styleUrl: './status-card.scss',
  standalone: true,
  imports: [UpperCasePipe, Avatar, FirstNamePipe, CommonModule, Button, Menu],
})
export class StatusCardComponent {
  task = input.required<Task>();
  edit = output<Task>();
  delete = output<Task>();
  options: MenuItem[] = [
    { label: 'Edit', command: () => this.editTask() },
    { label: 'Delete', command: () => this.deleteTask() },
  ];

  overDue = computed(() => 
    calculateDueDateStatus(this.task().dueDate, this.task().completedAt)
  );
  protected readonly severityMap = SEVERITY_MAP;

  editTask() {
    console.log('Edit task:', this.task().id);
    this.edit.emit(this.task());
  }

  deleteTask() {
    this.delete.emit(this.task());
  }

}
