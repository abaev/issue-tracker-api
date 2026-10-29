import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '#src/libraries/errors/errors.js';
import { hasOwn } from '#src/libraries/utils/object.js';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if(res.headersSent) {
    next(err);
    
    return;
  }

  if(err instanceof ApiError) {
    const response: ApiErrorResponse = { message: err.message };

    if(hasOwn<string>(err, 'details')) response.details = err.details;

    res.status(err.status).json(response);

    return;
  }

  console.error(err);

  res.status(500).json({ message: 'Internal server error' });
}

interface ApiErrorResponse {
  message: string;
  details?: unknown;
}