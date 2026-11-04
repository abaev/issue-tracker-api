import { Router, type Request } from 'express';
import { findTaskInput, createTaskInputSchema, updateTaskInputSchema } from './tasks.schemas.js';
import { BadRequestError, NotFoundError, TaskNotFoundError, fieldErrors } from '../../libraries/errors/errors.js';
import type { Task } from './tasks.js';
import { findTasks, createTask, updateTask, removeTask } from './tasks.service.js';

export const tasksRouter = Router();

// Получение задач
tasksRouter.get('/{:id}', (req, res) => {
  let tasks: Task[] = [];

  if(req.params.id) {
    // Когда передан парметр id - другие параметры не учитываются при поиске
    const id = parseTaskId(req);

    tasks = findTasks({ id });

    if(tasks.length === 0) {
      throw new NotFoundError(`Задача id = ${id} не найдена`);
    }
  
  } else {
    // Получение задач по status и seacrh
    let toParse: { [key: string]: unknown } | undefined;

    ['status', 'search'].forEach(n => {
      if(req.query[n] !== undefined) toParse = { ...toParse, [n]: req.query[n] };
    });

    if(toParse) {
      const parsed = findTaskInput.safeParse(toParse);

      if(parsed.error) {
        throw new BadRequestError('Неверные параметры запроса', { details: fieldErrors(parsed.error) });
      }

      tasks = findTasks(parsed.data);
      
      // Получение всех задач
    } else tasks = findTasks();
  }

  res.status(200).json({ tasks });
});

// Создание задачи
tasksRouter.post('/create', (req, res) => {
  const parsed = createTaskInputSchema.safeParse(req.body);

  if(parsed.error) {
    throw new BadRequestError('Неверное тело запроса', { details: fieldErrors(parsed.error) });
  }

  const task = createTask(parsed.data);

  res.status(201).json({ task });
});

// Изменение задачи
tasksRouter.patch('/:id', (req, res) => {
  const id = parseTaskId(req);

  const parsed = updateTaskInputSchema.safeParse(req.body);

  if(parsed.error) {
    throw new BadRequestError('Неверное тело запроса', { details: fieldErrors(parsed.error) });
  }

  try {
    const task = updateTask({ id, updateTaskInput: parsed.data });

    res.status(200).json({ task });

  } catch (error) {
    if(error instanceof TaskNotFoundError) {
      throw new NotFoundError(error.message, { cause: error });
    
    } else throw error;
  }
});

tasksRouter.delete('/:id', (req, res) => {
  const id = parseTaskId(req);

  const isDeleted = removeTask(id);

  if(!isDeleted) {
    throw new NotFoundError(`Задача id = ${id} не найдена`);
  }

  res.sendStatus(204);
});

function parseTaskId(req: Request): number {
  const id = Number(req.params.id);

  if(Number.isNaN(id) || id < 1 || !Number.isInteger(id)) {
    throw new BadRequestError('Неверные параметры запроса', { details: 'Невалидный id задачи' });
  }

  return id;
};