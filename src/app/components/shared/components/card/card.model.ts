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
export type ChangeType = "positive" | "negative" | "neutral";

export const mock: Statistic[] =    [{
        id: 'stat-001',
        title: 'Total Tasks',
        icon: '📊',
        value: 156,
        change: '+12',
        changeLabel: 'this week',
        changeType: 'positive',
        color: '#1976D2'
      },
      {
        id: 'stat-002',
        title: 'Completed',
        icon: '✅',
        value: 89,
        change: '+8',
        changeLabel: 'today',
        changeType: 'positive',
        color: '#388E3C'
      },
      {
        id: 'stat-003',
        title: 'In Progress',
        icon: '🔄',
        value: 42,
        change: '0',
        changeLabel: 'Same as yesterday',
        changeType: 'neutral',
        color: '#FF6F00'
      },
      {
        id: 'stat-004',
        title: 'Overdue',
        icon: '⚠️',
        value: 25,
        change: '+3',
        changeLabel: 'today',
        changeType: 'negative',
        color: '#D32F2F'
      }
    

    ]