import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Card } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { RecentActivityService } from './recent-activity.service';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.html',
  styleUrl: './recent-activity.scss',
  imports: [Card, TimelineModule, DatePipe],
})
export class RecentActivityComponent {
  recentActivityService = inject(RecentActivityService);
  layoutService = inject(LayoutService);

}
