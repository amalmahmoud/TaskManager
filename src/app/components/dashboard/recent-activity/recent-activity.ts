import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Card } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { RecentActivityService } from './recent-activity.service';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.html',
  imports: [Card, TimelineModule, DatePipe],
})
export class RecentActivityComponent {
  recentActivityService = inject(RecentActivityService);
}
