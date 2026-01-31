import { Component, computed, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { ChartComponent } from '../../../shared/components/chart/chart';
import { TaskService } from '../../tasks/task.service';
import { getThemeColor } from '../../../shared/utilitis/theme-utilitis';
import { statusLookup } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-analysis',
  templateUrl: './task-analysis.html',
  imports: [Card, ChartComponent],
})
export class TaskAnalysisComponent {
  taskService = inject(TaskService);
  chartData = computed(() => {
    const data = this.taskService.unFilteredData();
    if (!data || data.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#E5E7EB'],
            hoverBackgroundColor: ['#E5E7EB'],
            borderWidth: 0,
          },
        ],
      };
    }
   const priorityCounts = data.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
    return {
      labels: Object.keys(priorityCounts).map(key => key.toUpperCase()),
      datasets: [
        {
          label: 'Priority Distribution',
          data: Object.values(priorityCounts),
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
    const data = this.taskService.unFilteredData();
    if (!data || data.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#E5E7EB'],
            hoverBackgroundColor: ['#E5E7EB'],
            borderWidth: 0,
          },
        ],
      };
    }
    const statusCounts = data.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
    return {
      labels: Object.keys(statusCounts).map(key => statusLookup[key].label.toUpperCase()),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ['#64748b', '#3b82f6', '#22c55e'],
        },
      ],
    };
  });
}
