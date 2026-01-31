export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
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
export interface TaskResponse {
  tasks: Task[];
  meta: MetaData;
}

interface MetaData {
  totalCount: number;
  lastUpdated: string;
}
export interface PrioritiesModel {
  label: string;
  value: string;
}

export const priorities: PrioritiesModel[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const ASSIGNEES: Assignee[] = [
  { name: 'John Doe', id: 'user-001', avatar: 'JD' , email: "john.doe@company.com"},
  { name: 'Sarah Smith', id: 'user-002', avatar: 'SS', email:  "sarah.smith@company.com" },
  { name: 'Mike Johnson', id: 'user-003', avatar: 'MJ', email: "mike.johnson@company.com" },
  { name: 'Emily Davis', id: 'user-004', avatar: 'ED', email : "emily.davis@company.com" },
];

export interface StatusModel {
  label: string;
  value: TaskStatus;
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
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

export interface TaskGroups {
  todo: Task[];
  in_progress: Task[];
  done: Task[];
}

export const statusLookup: Record<string, StatusModel> = Object.fromEntries(
  tabsData.map((tab) => [tab.value, tab]),
);
