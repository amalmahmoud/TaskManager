import { Component, input, output } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { StatusCardComponent } from '../status-card/status-card';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.html',
  standalone: true,
  imports: [StatusCardComponent],
})
export class CardsListComponent {
  tasks = input<Task[]>();
  edit = output<any>();
  delete = output<any>();
}
