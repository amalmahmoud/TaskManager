import { Injectable, signal, computed } from '@angular/core';
import { Assignee, ASSIGNEES } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class AssigneeService {
  assignees = signal<Assignee[]>(ASSIGNEES);
  
  readonly filterOptions = computed(() => [
    { name: 'Unassigned', id: 'unassigned', avatar: '?' },
    ...this.assignees()
  ]);
}