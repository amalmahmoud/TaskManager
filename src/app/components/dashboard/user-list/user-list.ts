import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { AssigneeService } from '../../../core/services/assignee.service';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  imports: [Card,Avatar,Button],
})
export class UserListComponent {
      private assigneeService = inject(AssigneeService);
      assignees = this.assigneeService.assignees;

}
