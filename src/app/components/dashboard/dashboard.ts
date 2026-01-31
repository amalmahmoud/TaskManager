import { Component, computed, inject } from '@angular/core';
import { StatisticsComponent } from '../tasks/statistics-cards/statistics-cards';
import { mock } from '../../shared/components/card/card.model';
import { ChartComponent } from '../../shared/components/chart/chart';
import { TaskService } from '../tasks/task.service';
import { getThemeColor } from '../../shared/utilitis/theme-utilitis';
import { Card } from 'primeng/card';
import { RecentActivityService } from './recent-activity/recent-activity.service';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
import { AssigneeService } from '../../core/services/assignee.service';
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
  assigneeService = inject(AssigneeService);
  assignees = this.assigneeService.filterOptions;
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
}
