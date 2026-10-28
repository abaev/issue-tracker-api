import express from 'express';
import { healthRouter } from '#src/features/health/health.routes.js';

export const app = express();

app.use(express.json());
app.use('/api/health', healthRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
