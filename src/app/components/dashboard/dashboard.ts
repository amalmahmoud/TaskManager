import { Component } from '@angular/core';
import { StatisticsComponent } from '../tasks/statistics-cards/statistics-cards';
import { RecentActivityComponent } from './recent-activity/recent-activity';
import { TaskAnalysisComponent } from './task-analysis/task-analysis';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [StatisticsComponent, RecentActivityComponent,TaskAnalysisComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
}
