export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TabValue = TaskStatus | 'all';
export interface Assignee {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  isOverdue?: boolean;
  completedAt?: string;
  assignee: Assignee;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PrioritiesModel {
  label: string;
  value: string;
  icon: string;
}

export const priorities: PrioritiesModel[] = [
  { label: 'Low', value: 'low', icon: 'pi pi-circle-fill low-icon' },
  { label: 'Medium', value: 'medium', icon: 'pi pi-circle-fill medium-icon ' },
  { label: 'High', value: 'high', icon: 'pi pi-circle-fill high-icon' },
];

export const assignees: Assignee[] = [
  { name: 'John Doe', id: 'user-001', avatar: 'JD' },
  { name: 'Sarah Smith', id: 'user-002', avatar: 'SS' },
  { name: 'Mike Johnson', id: 'user-003', avatar: 'MJ' },
  { name: 'Emily Davis', id: 'user-004', avatar: 'ED' },
];

export interface StatusModel {
  label: string;
  value: TabValue;
}
export const status: StatusModel[] = [
  {
    label: 'TO DO',
    value: 'todo',
  },
  {
    label: 'IN PROGRESS',
    value: 'in_progress',
  },
  {
    label: 'DONE',
    value: 'done',
  },
];

export const tabsData: StatusModel[] = [
  { label: 'All', value: 'all' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];
