import type { TTaskStatus } from '../types/taskStatus';
import type { TTaskPriority } from '../types/taskPriority';

export default interface Task {
  id: number;
  title: string;
  createdAt: Date;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
}