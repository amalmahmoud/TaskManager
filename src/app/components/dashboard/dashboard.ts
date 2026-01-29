import { Component, computed, inject, signal } from '@angular/core';
import { mock, Statistic } from '../shared/components/card/card.model';
import { StatisticsComponent } from './statistics-cards/statistics-cards';
import { Tab, TabList, TabPanels, Tabs } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list';
import { priorities, tabsData } from '../../core/models/task.model';
import { TaskFormComponent } from '../task-form/task-form';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { TaskService } from '../../core/services/task.service';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
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
export class DashboardComponent {
  statistics = signal<Statistic[] | []>([]);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  taskService = inject(TaskService);
  currentTabStatus = signal<string | number | undefined>('all');
  filteredTasks = this.taskService.filteredTasks;
  todoTasks = this.taskService.todoTasks;
  inprogressTasks = this.taskService.inprogressTasks;
  completedTasks = this.taskService.completedTasks;
  tabs = tabsData;
  priorities = priorities;

  ngOnInit() {
    this.statistics.set(mock);
    this.taskService.tasksData.set(this.generateTasks().tasks);
    console.log(this.taskService.tasksData());
  }

  generateTasks() {
    const now = new Date();

    const tasks = [
      // TO DO TASKS
      {
        id: 'task-001',
        title: 'Design new homepage layout',
        description:
          'Create wireframes and mockups for the new homepage redesign with modern UI elements',
        status: 'todo',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, 2)), // Due in 2 days
        assignee: {
          id: 'user-001',
          name: 'John Doe',
          avatar: 'JD',
          email: 'john.doe@company.com',
        },
        tags: ['Design'],
        createdAt: this.addDays(now, -2).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'task-002',
        title: 'Update documentation',
        description: 'Review and update API documentation for v2.0 release',
        status: 'todo',
        priority: 'medium',
        dueDate: this.formatDate(this.addDays(now, 5)), // Due in 5 days
        assignee: {
          id: 'user-002',
          name: 'Sarah Smith',
          avatar: 'SS',
          email: 'sarah.smith@company.com',
        },
        tags: ['Documentation'],
        createdAt: this.addDays(now, -3).toISOString(),
        updatedAt: this.addDays(now, -1).toISOString(),
      },
      {
        id: 'task-003',
        title: 'Organize team meeting',
        description: 'Schedule and prepare agenda for quarterly planning session',
        status: 'todo',
        priority: 'low',
        dueDate: this.formatDate(this.addDays(now, 7)), // Due in 1 week
        assignee: {
          id: 'user-003',
          name: 'Mike Johnson',
          avatar: 'MJ',
          email: 'mike.johnson@company.com',
        },
        tags: ['Admin'],
        createdAt: this.addDays(now, -4).toISOString(),
        updatedAt: this.addDays(now, -1).toISOString(),
      },
      // OVERDUE TO DO TASKS
      {
        id: 'task-015',
        title: 'Prepare Q4 budget report',
        description: 'Compile and analyze financial data for quarterly budget presentation',
        status: 'todo',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, -2)), // Was due 2 days ago
        isOverdue: true,
        assignee: {
          id: 'user-002',
          name: 'Sarah Smith',
          avatar: 'SS',
          email: 'sarah.smith@company.com',
        },
        tags: ['Finance'],
        createdAt: this.addDays(now, -16).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'task-016',
        title: 'Review client feedback',
        description: 'Analyze customer feedback from user testing sessions',
        status: 'todo',
        priority: 'medium',
        dueDate: this.formatDate(this.addDays(now, -3)), // Was due 3 days ago
        isOverdue: true,
        assignee: {
          id: 'user-004',
          name: 'Emily Davis',
          avatar: 'ED',
          email: 'emily.davis@company.com',
        },
        tags: ['Research'],
        createdAt: this.addDays(now, -15).toISOString(),
        updatedAt: this.addDays(now, -1).toISOString(),
      },
      {
        id: 'task-004',
        title: 'Fix responsive design issues',
        description: 'Address layout problems on mobile and tablet devices',
        status: 'todo',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, 3)), // Due in 3 days
        assignee: {
          id: 'user-004',
          name: 'Emily Davis',
          avatar: 'ED',
          email: 'emily.davis@company.com',
        },
        tags: ['Frontend'],
        createdAt: this.addDays(now, -5).toISOString(),
        updatedAt: now.toISOString(),
      },

      // IN PROGRESS TASKS
      {
        id: 'task-005',
        title: 'Implement user authentication',
        description: 'Add JWT-based authentication system with refresh tokens',
        status: 'in_progress',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, 3)), // Due in 3 days
        assignee: {
          id: 'user-001',
          name: 'John Doe',
          avatar: 'JD',
          email: 'john.doe@company.com',
        },
        tags: ['Backend'],
        createdAt: this.addDays(now, -7).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'task-006',
        title: 'Optimize database queries',
        description: 'Review and optimize slow queries identified in performance audit',
        status: 'in_progress',
        priority: 'medium',
        dueDate: this.formatDate(this.addDays(now, 4)), // Due in 4 days
        assignee: {
          id: 'user-002',
          name: 'Sarah Smith',
          avatar: 'SS',
          email: 'sarah.smith@company.com',
        },
        tags: ['Performance'],
        createdAt: this.addDays(now, -6).toISOString(),
        updatedAt: this.addDays(now, -0.5).toISOString(),
      },
      {
        id: 'task-007',
        title: 'Create API endpoints',
        description: 'Develop RESTful API endpoints for task management features',
        status: 'in_progress',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, 2)), // Due in 2 days
        assignee: {
          id: 'user-003',
          name: 'Mike Johnson',
          avatar: 'MJ',
          email: 'mike.johnson@company.com',
        },
        tags: ['Backend'],
        createdAt: this.addDays(now, -8).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'task-008',
        title: 'Add dark mode support',
        description: 'Implement theme toggle with dark/light mode preferences',
        status: 'in_progress',
        priority: 'medium',
        dueDate: this.formatDate(this.addDays(now, 6)), // Due in 6 days
        assignee: {
          id: 'user-004',
          name: 'Emily Davis',
          avatar: 'ED',
          email: 'emily.davis@company.com',
        },
        tags: ['Frontend'],
        createdAt: this.addDays(now, -9).toISOString(),
        updatedAt: this.addDays(now, -0.3).toISOString(),
      },
      // OVERDUE IN PROGRESS TASK
      {
        id: 'task-017',
        title: 'Update payment gateway integration',
        description: 'Migrate to new payment provider API and update billing logic',
        status: 'in_progress',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, -1)), // Was due yesterday
        isOverdue: true,
        assignee: {
          id: 'user-001',
          name: 'John Doe',
          avatar: 'JD',
          email: 'john.doe@company.com',
        },
        tags: ['Backend', 'Critical'],
        createdAt: this.addDays(now, -14).toISOString(),
        updatedAt: now.toISOString(),
      },

      // DONE TASKS
      {
        id: 'task-009',
        title: 'Fix critical login bug',
        description: 'Resolved issue preventing users from logging in on mobile devices',
        status: 'done',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, -1)), // Was due yesterday
        completedAt: now.toISOString(),
        assignee: {
          id: 'user-003',
          name: 'Mike Johnson',
          avatar: 'MJ',
          email: 'mike.johnson@company.com',
        },
        tags: ['Bug Fix'],
        createdAt: this.addDays(now, -2).toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: 'task-010',
        title: 'Setup CI/CD pipeline',
        description: 'Configured GitHub Actions for automated testing and deployment',
        status: 'done',
        priority: 'medium',
        dueDate: this.formatDate(this.addDays(now, -2)), // Was due 2 days ago
        completedAt: this.addDays(now, -1).toISOString(),
        assignee: {
          id: 'user-001',
          name: 'John Doe',
          avatar: 'JD',
          email: 'john.doe@company.com',
        },
        tags: ['DevOps'],
        createdAt: this.addDays(now, -9).toISOString(),
        updatedAt: this.addDays(now, -1).toISOString(),
      },
      {
        id: 'task-011',
        title: 'Write unit tests',
        description: 'Add comprehensive unit tests for authentication module',
        status: 'done',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, -3)), // Was due 3 days ago
        completedAt: this.addDays(now, -2).toISOString(),
        assignee: {
          id: 'user-002',
          name: 'Sarah Smith',
          avatar: 'SS',
          email: 'sarah.smith@company.com',
        },
        tags: ['Testing'],
        createdAt: this.addDays(now, -10).toISOString(),
        updatedAt: this.addDays(now, -2).toISOString(),
      },
      {
        id: 'task-012',
        title: 'Refactor payment module',
        description: 'Clean up and optimize payment processing code',
        status: 'done',
        priority: 'medium',
        dueDate: this.formatDate(this.addDays(now, -4)), // Was due 4 days ago
        completedAt: this.addDays(now, -3).toISOString(),
        assignee: {
          id: 'user-004',
          name: 'Emily Davis',
          avatar: 'ED',
          email: 'emily.davis@company.com',
        },
        tags: ['Refactoring'],
        createdAt: this.addDays(now, -12).toISOString(),
        updatedAt: this.addDays(now, -3).toISOString(),
      },
      {
        id: 'task-013',
        title: 'Security audit',
        description: 'Conduct comprehensive security review of the application',
        status: 'done',
        priority: 'high',
        dueDate: this.formatDate(this.addDays(now, -5)), // Was due 5 days ago
        completedAt: this.addDays(now, -4).toISOString(),
        assignee: {
          id: 'user-001',
          name: 'John Doe',
          avatar: 'JD',
          email: 'john.doe@company.com',
        },
        tags: ['Security'],
        createdAt: this.addDays(now, -13).toISOString(),
        updatedAt: this.addDays(now, -4).toISOString(),
      },
      {
        id: 'task-014',
        title: 'Update dependencies',
        description: 'Update all npm packages to latest stable versions',
        status: 'done',
        priority: 'low',
        dueDate: this.formatDate(this.addDays(now, -6)), // Was due 6 days ago
        completedAt: this.addDays(now, -5).toISOString(),
        assignee: {
          id: 'user-003',
          name: 'Mike Johnson',
          avatar: 'MJ',
          email: 'mike.johnson@company.com',
        },
        tags: ['Maintenance'],
        createdAt: this.addDays(now, -14).toISOString(),
        updatedAt: this.addDays(now, -5).toISOString(),
      },
    ];

    return {
      tasks,
      meta: {
        totalCount: tasks.length,
        lastUpdated: now.toISOString(),
      },
    };
  }
  /**
   * Add days to a date
   */
  addDays(date: any, days: any) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Format date as YYYY-MM-DD
   */
  formatDate(date: any) {
    return date.toISOString().split('T')[0];
  }
  handleTaskSave(taskData: any) {
    const isEdit = !!taskData.id;
    this.taskService.saveTask(taskData);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: isEdit ? 'Task updated successfully' : 'Task added successfully',
    });
  }
  confirmDelete(task: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteTask(task.id);
      },
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmed',
      detail: 'Task removed successfully',
    });
  }

getActiveTabTasks() {
  const status = this.currentTabStatus();
  
  switch (status) {
    case 'todo':
      return this.taskService.todoTasks();
    case 'in_progress':
      return this.taskService.inprogressTasks();
    case 'done':
      return this.taskService.completedTasks();
    default:
      return this.taskService.filteredTasks();
  }
}
  onPriorityFilter(task:any)
  {
      this.taskService.setPriorityFilter(task.value);
  }
}
