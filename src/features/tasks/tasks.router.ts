import { Router } from 'express';
import { z } from 'zod';
import { taskStatusSchema } from '#src/features/tasks/tasks.schemas.js';
import { BadRequestError, fieldErrors } from '#src/libraries/errors/errors.js';
import { findTasks } from '#src/features/tasks/tasks.service.js';

export const tasksRouter = Router();

tasksRouter.get('/', (req, res) => {
  const { status, search } = req.query;
  
  console.log('status', status, 'typeof status', typeof status, 'status.length', status?.length);
  console.log('search', search, 'typeof search', typeof search, 'search.length', search?.length);
  console.log(search);

  if(status !== undefined) {
    const statusError = (taskStatusSchema.safeParse(status)).error;

    if(statusError) {
      const e = fieldErrors(statusError);
      throw new BadRequestError('Invalid request body', { details: fieldErrors(statusError) });
    }
  }

  res.status(200).json({ tasks: findTasks() });
});

