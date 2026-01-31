import { Injectable, signal, effect } from '@angular/core';
import { TaskActivity } from '../../../core/models/task-activity';

@Injectable({ providedIn: 'root' })
export class RecentActivityService {
  private historyLog = signal<TaskActivity[]>(this.loadFromSession());
  public history = this.historyLog.asReadonly();

  constructor() {
    effect(() => {
      sessionStorage.setItem('task_history', JSON.stringify(this.historyLog()));
    });
  }

  log(action: string, taskTitle: string, type: TaskActivity['type'], status: string) {
    const newEntry: TaskActivity = {
      id: crypto.randomUUID(),
      user: 'John',
      action,
      taskTitle,
      type,
      timestamp: new Date(),
      status: status,
    };

    this.historyLog.update((logs) => [newEntry, ...logs].slice(0, 20));
  }

  private loadFromSession(): TaskActivity[] {
    const saved = sessionStorage.getItem('task_history');
    return saved ? JSON.parse(saved) : [];
  }
}
