import { Component, signal } from '@angular/core';
import { CardComponent } from '../shared/card/card';
import { mock, Statistic } from '../shared/card/card.model';
import { StatisticsComponent } from "./statistics-cards/statistics-cards";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [StatisticsComponent],
})
export class DashboardComponent {
  statistics = signal<Statistic[] | []>([]);
  ngOnInit() {
    this.statistics.set(mock);
  }
}
