import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
  imports: [Card],
})
export class CardComponent {
  title = input.required<string>();
  value = input.required();
  icon = input.required();
  color = input.required();
  changeLabel = input.required();
  change  = input.required();
}
