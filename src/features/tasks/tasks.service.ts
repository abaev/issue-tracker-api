import type { Task, CreateTaskInput, UpdateTaskInput, FindTaskInput } from '#src/features/tasks/tasks.js';
import { find, create, update, remove } from '#src/features/tasks/tasks.repository.js';
import { TaskNotFoundError } from '#src/libraries/errors/errors.js';

export function findTasks(options: FindTaskInput = {}): Task[] {
  return find(options);
}

export function createTask(options: CreateTaskInput): Task {
  return create(options);
}

export function updateTask(options: { id: number, updateTaskInput: UpdateTaskInput }): Task {
  const task = update(options);

  if(!task) throw new TaskNotFoundError(`Задача id = ${options.id} не найдена`);

  return task;
}

export function removeTask(id: number): boolean {
  return remove(id);
}