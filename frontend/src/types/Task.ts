export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  targetDate?: string;
  priority?: number;
  createdAt: string;
  updatedAt: string;
}
