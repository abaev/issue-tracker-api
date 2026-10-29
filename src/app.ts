import express from 'express';
import { healthRouter } from '#src/features/health/health.routes.js';
import { tasksRouter } from '#src/features/tasks/tasks.router.js';
import { errorHandler } from '#src/libraries/errors/error-handler.js';

export const app = express();

app.use(express.json());
app.use('/api/health', healthRouter);
app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);
