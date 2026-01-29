import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasksData = signal<any[]>([]);
  searchQuery = signal<string>('');
  selectedPriority = signal<string | null>(null);

  filteredTasks = computed(() => {
    const tasks = this.tasksData();
    const priority = this.selectedPriority();
    const search = this.searchQuery().toLowerCase().trim();

    let filtered = tasks;
    if (priority && priority !== 'all') {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    if (search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }

    return filtered;
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
        } else if (updatedTask.status === 'done' && !updatedTask.completedAt) {
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
