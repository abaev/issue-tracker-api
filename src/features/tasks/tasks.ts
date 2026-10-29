
export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export type TaskStatus = 'open' | 'in_progress' | 'done';

export type CreateTaskInput = Pick<Task, 'title' | 'description'>;

export type UpdateTaskInput = Partial<Pick<Task, 'title' | 'description' | 'status'>>;

export type FindTaskInput = Partial<Pick<Task, 'id' | 'status'>> & { search?: string };
