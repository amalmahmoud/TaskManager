import { Component, computed, inject } from '@angular/core';
import { StatisticsComponent } from '../tasks/statistics-cards/statistics-cards';
import { mock } from '../../shared/components/card/card.model';
import { ChartComponent } from '../../shared/components/chart/chart';
import { TaskService } from '../tasks/task.service';
import { getThemeColor } from '../../shared/utilitis/theme-utilitis';
import { Card } from 'primeng/card';
import { assignees } from '../../core/models/task.model';
import { RecentActivityService } from './recent-activity/recent-activity.service';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [StatisticsComponent, ChartComponent, Card, TimelineModule,DatePipe],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  statistics = mock;
  taskService = inject(TaskService);
  recentActivityService = inject(RecentActivityService);
  assignees = assignees;
  events: any;
  chartData = computed(() => {
    const data = this.taskService.unFilteredData();
    return {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          label: 'Priority Distribution',
          data: [
            data.filter((t) => t.priority === 'high').length,
            data.filter((t) => t.priority === 'medium').length,
            data.filter((t) => t.priority === 'low').length,
          ],
          backgroundColor: [
            getThemeColor('--priority-high'),
            getThemeColor('--priority-medium'),
            getThemeColor('--priority-low'),
          ],
          hoverOffset: 4,
        },
      ],
    };
  });

  statusChartData = computed(() => {
    const data = this.taskService.filteredTasks();
    console.log(data);
    return {
      labels: ['To Do', 'In Progress', 'Done'],
      datasets: [
        {
          data: [
            data.filter((t) => t.status === 'todo').length,
            data.filter((t) => t.status === 'in_progress').length,
            data.filter((t) => t.status === 'done').length,
          ],
          backgroundColor: ['#64748b', '#3b82f6', '#22c55e'],
        },
      ],
    };
  });

  constructor() {
    this.events = [
      {
        status: 'Ordered',
        date: '15/10/2020 10:30',
        icon: 'pi pi-shopping-cart',
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      {
        status: 'Shipped',
        date: '15/10/2020 16:15',
        icon: 'pi pi-shopping-cart',
        color: '#FF9800',
      },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },

      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
    ];
  }
}
