import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsResponse } from '../../../core/models/statistics.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly apiUrl = '/api/statistics';

  statistics = httpResource<StatisticsResponse>(() => this.apiUrl);

}
