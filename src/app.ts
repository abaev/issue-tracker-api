import express, { type Request, type Response, type NextFunction } from 'express';
import { healthRouter } from './features/health/health.routes.js';
import { tasksRouter } from './features/tasks/tasks.router.js';
import { errorHandler } from './libraries/errors/error-handler.js';
import { BadRequestError } from './libraries/errors/errors.js';
import { hasOwn } from './libraries/utils/object.js';

export const app = express();

app.use(
  express.json(),
  
  // Обработка ошибки парсинга JSON
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(hasOwn<string>(err, 'type') && err.type === 'entity.parse.failed') {
      throw new BadRequestError('Ошибка парсинга JSON', { cause: err });
    }

    throw err;
  }
);

app.use('/api/health', healthRouter);
app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use(errorHandler);
