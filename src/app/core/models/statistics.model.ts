export interface Statistic {
  id: string;
  title: string;
  icon: string;
  value: number;
  change: string;
  changeLabel: string;
  changeType: ChangeType;
  color: string;
}
export type ChangeType = 'positive' | 'negative' | 'neutral';

export interface StatisticsResponse {
  statistics: Statistic[];
  lastUpdated: string;
}
