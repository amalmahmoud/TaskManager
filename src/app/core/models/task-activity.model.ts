
export interface TaskActivity {
  id: string;
  action: string;
  taskTitle: string;
  timestamp: Date;
  status: string;
  type: 'add' | 'update' | 'delete' | 'status';
}