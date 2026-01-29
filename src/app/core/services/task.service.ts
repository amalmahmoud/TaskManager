import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasksData = signal<any[]>([]);

  selectedPriority = signal<string | null>(null);

  filteredTasks = computed(() => {
    const tasks = this.tasksData();
    const priority = this.selectedPriority();

    if (!priority || priority === 'all') {
      return tasks;
    }

    return tasks.filter((task) => task.priority === priority);
  });

  todoTasks = computed(() => this.filteredTasks().filter((t) => t.status === 'todo'));

  inprogressTasks = computed(() => this.filteredTasks().filter((t) => t.status === 'in_progress'));

  completedTasks = computed(() => this.filteredTasks().filter((t) => t.status === 'done'));

  setPriorityFilter(priority: string | null) {
    this.selectedPriority.set(priority);
  }
  saveTask(taskData: any) {
    this.tasksData.update((currentTasks) => {
      const index = currentTasks.findIndex((t) => t.id === taskData.id);

      if (index !== -1) {
        const updatedTasks = [...currentTasks];

        const updatedTask = { ...currentTasks[index], ...taskData };

        if (updatedTask.status === 'todo') {
          updatedTask.completedAt = null;
        }
        // Logic: If status is 'completed' and it wasn't before, add timestamp
        else if (updatedTask.status === 'done' && !updatedTask.completedAt) {
          updatedTask.completedAt = new Date().toISOString();
        }

        updatedTasks[index] = updatedTask;
        return updatedTasks;
      } else {
        const newTask = {
          ...taskData,
          id: Date.now(),
          completedAt: taskData.status === 'done' ? new Date().toISOString() : null,
        };
        return [...currentTasks, newTask];
      }
    });
  }

  deleteTask(id: string) {
    this.tasksData.update((tasks) => tasks.filter((t) => t.id !== id));
  }
  priorityFilter(priority: string) {
    this.tasksData.update((tasks) => tasks.filter((t) => t.priority !== priority));
  }
}
