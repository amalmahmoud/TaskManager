import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { statusLookup, Task, TaskResponse } from '../../core/models/task.model';
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

    return allTasks.filter((task: any) => {
      const matchesSearch = !search || task.title?.toLowerCase().includes(search);
      const matchesPriority = priority === 'all' || task.priority === priority;
      return matchesSearch && matchesPriority;
    });
  });
  setPriorityFilter(priority: string | null) {
    this.selectedPriority.set(priority);
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
