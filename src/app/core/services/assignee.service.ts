import { Injectable, signal, computed } from '@angular/core';
import { Assignee, ASSIGNEES } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class AssigneeService {
  private _assignees = signal<Assignee[]>(ASSIGNEES);
  
  readonly assignees = this._assignees.asReadonly();

  readonly filterOptions = computed(() => [
    { name: 'Unassigned', id: 'unassigned', avatar: '?' },
    ...this._assignees()
  ]);
}