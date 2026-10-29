import { find } from '#src/features/tasks/tasks.repository.js';

export function findTasks() {
  return find();
}