import { Component, inject, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.html',
  imports: [ChartModule],
})
export class ChartComponent {
  layoutService = inject(LayoutService);

  data = input.required();
  type = input.required<
    'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | undefined
  >();
  options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: this.layoutService.isMobile()? 'start': 'center',
        padding: 20,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
}