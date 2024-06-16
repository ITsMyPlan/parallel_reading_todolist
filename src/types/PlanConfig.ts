import { TaskConfig } from '@/types/TaskConfig';

export interface PlanConfig {
  id: number,
  book_name: string,
  author: string,
  description: string,
  start_date: Date,
  end_date: Date,
  tasks: TaskConfig[]
}
