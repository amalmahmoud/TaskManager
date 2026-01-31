import { Component, computed, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { ChartComponent } from '../../../shared/components/chart/chart';
import { TaskService } from '../../tasks/task.service';
import { getThemeColor } from '../../../shared/utilitis/theme-utilitis';

@Component({
  selector: 'app-task-analysis',
  templateUrl: './task-analysis.html',
  imports: [Card, ChartComponent],
})
export class TaskAnalysisComponent {
  taskService = inject(TaskService);
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
