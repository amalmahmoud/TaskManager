import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  imports: [ProgressSpinner],
})
export class LoaderComponent {
   loader = inject(LoadingService);
}
