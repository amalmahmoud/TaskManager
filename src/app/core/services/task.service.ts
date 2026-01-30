import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, signal, computed, inject } from '@angular/core';
import { Task, TaskGroups, TaskResponse } from '../models/task.model';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/tasks';
  taskData = httpResource<TaskResponse>(() => this.apiUrl);
  searchQuery = signal<string>('');
  selectedPriority = signal<string | null>(null);
  filteredTasks = computed(() => {
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

  editTask(taskData: Task) :Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskData.id}`, taskData).pipe(
      tap(() => this.taskData.reload()),
    );
  }

  addNewTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask).pipe(
      tap(() => this.taskData.reload()),
    );
  }

 deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}` ).pipe(
      tap(() => this.taskData.reload()),
    );
  }
}
