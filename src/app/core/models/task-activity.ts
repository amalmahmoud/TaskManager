
export interface TaskActivity {
  id: string;
  user: string;
  action: string;
  taskTitle: string;
  timestamp: Date;
  status: string;
  type: 'add' | 'update' | 'delete' | 'status';
}