import { Component, input } from '@angular/core';
import { CardComponent } from '../../shared/card/card';
import { Statistic } from '../../shared/card/card.model';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.html',
  standalone: true,
  imports: [CardComponent],
})
export class StatisticsComponent {
  statistics = input<Statistic[]>();
}
