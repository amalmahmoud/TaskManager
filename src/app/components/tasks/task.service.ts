import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Assignee, statusLookup, Task, TaskResponse } from '../../core/models/task.model';
import { RecentActivityService } from '../dashboard/recent-activity/recent-activity.service';
import { determineChange } from '../../shared/utilitis/history-log-utilitis';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private recentActivityService = inject(RecentActivityService);
  private readonly apiUrl = '/api/tasks';
  taskData = httpResource<TaskResponse>(() => this.apiUrl);
  searchQuery = signal<string>('');
  selectedPriority = signal<string | null>(null);
  selectedAssignee = signal<string | null>(null);
  unFilteredData = computed(() => {
    if (this.taskData.error()) return [];
    return this.taskData.value()?.tasks ?? [];
  });
  filteredTasks = computed(() => {
    if (this.taskData.error() || !this.taskData.value()) {
      return [];
    }
    const response = this.taskData.value();
    const allTasks = response?.tasks ?? [];

    const search = (this.searchQuery() || '').toLowerCase().trim();
    const priority = this.selectedPriority() || 'all';
    const assignee = this.selectedAssignee();

    return allTasks.filter((task: Task) => {
      const matchesSearch = !search || task.title?.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = priority === 'all' || task.priority === priority;
      console.log(assignee)
      const matchesAssignee =  !assignee  || task.assignee?.id === assignee;
      return matchesSearch && matchesPriority && matchesAssignee;
    });
  });
  setPriorityFilter(priority: string | null) {
    this.selectedPriority.set(priority);
  }

  setAssigneeFilter(assignee: string | null) {
    this.selectedAssignee.set(assignee);
  }
  editTask(taskData: Task): Observable<Task> {
    const oldTask = this.unFilteredData().find((t) => t.id === taskData.id);
    return this.http.put<Task>(`${this.apiUrl}/${taskData.id}`, taskData).pipe(
      tap((updatedTask) => {
        const changeMessage = determineChange(oldTask, updatedTask);
        this.recentActivityService.log(
          changeMessage,
          updatedTask.title,
          'update',
          statusLookup[taskData.status].label,
        );
        this.taskData.reload();
      }),
    );
  }

  addNewTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask).pipe(
      tap(() => {
        this.recentActivityService.log(
          'Created new task',
          newTask.title,
          'add',
          statusLookup[newTask.status].label,
        );
        this.taskData.reload();
      }),
    );
  }

  deleteTask(id: string, title: string, status: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.recentActivityService.log(
          'Permanently deleted task',
          title,
          'delete',
          statusLookup[status].label,
        );
        this.taskData.reload();
      }),
    );
  }
}
