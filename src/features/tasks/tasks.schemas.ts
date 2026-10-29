import { z } from 'zod';
import type { TaskStatus, CreateTaskInput, UpdateTaskInput, FindTaskInput } from '#src/features/tasks/tasks.js';

const taskTitleSchema = z.string().min(1, 'Заголовок обязателен');
const taskDescriptionSchema = z.string('Должно быть строкой');

export const createTaskInputSchema = z.toZod<CreateTaskInput>()(z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema
}));

export const taskStatusSchema = z.toZod<TaskStatus>()(z.union(
  [
    z.literal('open'),
    z.literal('in_progress'),
    z.literal('done'),
  ],
  { error: 'Недопустимый статус задачи' },
));

export const updateTaskInputSchema = z.toZod<UpdateTaskInput>()(z.object({
  title: taskTitleSchema.exactOptional(),
  description: taskDescriptionSchema.exactOptional(),
  status: taskStatusSchema.exactOptional()
}));

export const findTaskInput = z.toZod<FindTaskInput>()(z.object({
  id: z.number('Должно быть числом').exactOptional(),
  status: taskStatusSchema.exactOptional(),
  search: z.string('Должно быть строкой').exactOptional()
}));

