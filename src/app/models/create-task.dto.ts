import { TaskStatus } from '../task-status';

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
