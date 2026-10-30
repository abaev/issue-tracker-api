import type { Task, CreateTaskInput, UpdateTaskInput, FindTaskInput } from '#src/features/tasks/tasks.js';

const tasks: Task[] = [
  {
    id: 1,
    title: 'Шаг 1',
    description: 'Создание приложения, первичная настройка',
    status: 'done'
  },
  {
    id: 2,
    title: 'Шаг 2',
    description: 'Модули - типы, схемы Zod, репозиторий',
    status: 'in_progress'
  }
]; 

let nextId = 3;

export function create(options: CreateTaskInput): Task {
  const task: Task = {
    id: nextId++,
    ...options,
    status: 'open'
  };

  tasks.push(task);

  return structuredClone(task);
}

export function find(options: FindTaskInput = {}): Task[] {
  return tasks.filter(task => {
    let conditionsResults: boolean[] = [];

    if(options.id !== undefined) conditionsResults.push(task.id === options.id);

    if(options.status !== undefined) conditionsResults.push(task.status === options.status);

    if(options.search) {
      conditionsResults.push(task.title.toLowerCase().includes(options.search.toLowerCase()));
    }

    return conditionsResults.every(c => c);
  });
}

export function update(options: { id: number, updateTaskInput: UpdateTaskInput }): Task | undefined {
  const index = tasks.findIndex(t => t.id === options.id);

  if(!tasks[index]) return undefined;

  tasks[index] = {
    ...tasks[index],
    ...options.updateTaskInput
  };

  return tasks[index];
}

export function remove(id: number): boolean {
  const index = tasks.findIndex(t => t.id === id);

  if(index === -1) return false;

  tasks.splice(index, 1);

  return true;
}
