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

export function create(createTaskInput: CreateTaskInput): Task {
  const task: Task = {
    id: nextId++,
    ...createTaskInput,
    status: 'open'
  };

  tasks.push(task);

  return structuredClone(task);
}

export function find({ id, status, search }: FindTaskInput = {}): Task[] {
  return tasks.filter(task => {
    let conditionsResults: boolean[] = [];

    if(id !== undefined) conditionsResults.push(task.id === id);

    if(status !== undefined) conditionsResults.push(task.status === status);

    if(search) {
      conditionsResults.push(task.title.toLowerCase().includes(search.toLowerCase()));
    }

    return conditionsResults.every(c => c);
  });
}

export function update({ id, updateTaskInput }: { id: number, updateTaskInput: UpdateTaskInput }): Task | undefined {
  const index = tasks.findIndex(t => t.id === id);

  if(!tasks[index]) return undefined;

  tasks[index] = {
    ...tasks[index],
    ...updateTaskInput
  };

  return tasks[index];
}

export function remove(id: number): boolean {
  const index = tasks.findIndex(t => t.id === id);

  if(index === -1) return false;

  tasks.splice(index, 1);

  return true;
}
