import { TaskStatus } from '../task-status';

export default interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  end?: Date;
}