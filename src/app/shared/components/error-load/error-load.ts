import { Component, input, output } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-error-load',
  templateUrl: './error-load.html',
  standalone: true,
  imports: [Card,Button],
})
export class ErrorLoadComponent {
  
  label = input.required<string>();
  retry = output<void>();
}
