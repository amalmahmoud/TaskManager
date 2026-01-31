import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card';
import { StatisticsService } from './statistics.service';
import { ErrorLoadComponent } from '../../../shared/components/error-load/error-load';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.html',
  standalone: true,
  imports: [CardComponent,ErrorLoadComponent],
})
export class StatisticsComponent {
private statsService = inject(StatisticsService);
  
  statistics = this.statsService.statistics;

}
