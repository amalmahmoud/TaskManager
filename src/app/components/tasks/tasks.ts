import { Component, computed, inject, signal } from '@angular/core';
import { StatisticsComponent } from './statistics-cards/statistics-cards';
import { Tab, TabList, TabPanels, Tabs } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list';
import { priorities, tabsData, tabsLookup, Task, TaskStatus } from '../../core/models/task.model';
import { TaskFormComponent } from '../task-form/task-form';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TaskService } from './task.service';
import { mock, Statistic } from '../../shared/components/card/card.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  standalone: true,
  imports: [
    StatisticsComponent,
    TabPanels,
    TabList,
    Tab,
    Tabs,
    CommonModule,
    CardsListComponent,
    TaskFormComponent,
    ConfirmDialog,
    Toast,
    Button,
    SelectModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class TasksComponent {
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  public taskService = inject(TaskService);
  statistics = signal<Statistic[]>([]);
  currentTabStatus = signal<TaskStatus>('todo');
  tabs = tabsData;
  tabsLookup = tabsLookup;

  showAll = signal<boolean>(true);
  priorities = priorities;
  allTaskData = computed(() => {
    const tasks = this.taskService.filteredTasks();

    return {
      todo: tasks.filter((t) => t.status === 'todo'),
      in_progress: tasks.filter((t) => t.status === 'in_progress'),
      done: tasks.filter((t) => t.status === 'done'),
    };
  });

  ngOnInit() {
    this.statistics.set(mock);
  }

  private notify(severity: 'success' | 'error', summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  handleAddTask(taskData: Task) {
    console.log(taskData);
    this.taskService.addNewTask(taskData).subscribe({
      next: () => {
        this.notify('success', 'Success', 'Task added successfully');
      },
      error: () => {
        this.notify('error', 'Error', 'Task failed to be Added');
      },
    });
  }

  handleEditTask(taskData: Task) {
    console.log(taskData);
    this.taskService.editTask(taskData).subscribe({
      next: () => {
        this.notify('success', 'Success', 'Task edited successfully');
      },
      error: () => {
        this.notify('error', 'Error', 'Task failed to be edited');
      },
    });
  }

  confirmDelete(task: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.taskService.deleteTask(task.id).subscribe({
          next: () => {
            this.notify('success', 'Confirmed', 'Task deleted successfully');
          },
          error: () => {
            this.notify('error', 'Error', 'Delete task failed');
          },
        });
      },
    });
  }

  onPriorityFilter(event: any) {
    this.taskService.setPriorityFilter(event.value);
  }
  onTabChange(value: string | number | undefined) {
    if (value === 'all') {
      this.showAll.set(true);
    } else if (value) {
      this.showAll.set(false);
      this.currentTabStatus.set(value as TaskStatus);
    }
  }
}
