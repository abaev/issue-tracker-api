import type { ZodError } from 'zod';
import { hasOwn } from '../utils/object.js';

export interface BaseErrorOptions extends ErrorOptions {
  details?: unknown;
}

export interface ApiErrorOptions extends ErrorOptions {
  status: number;
  details?: unknown; /* Отправляется клиенту */
}

type ClientErrorOptions = Omit<ApiErrorOptions, 'status'>;

export class BaseError extends Error {
  declare details?: unknown;

  constructor(message: string, options: BaseErrorOptions) {
    super(message, options);
    this.name = 'BaseError';

    if(hasOwn<string>(options, 'details')) this.details = options.details;
  }
}

export class ApiError extends BaseError {
  status: number;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, options);
    this.name = 'ApiError';
    this.status = options.status;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, options?: ClientErrorOptions) {
    const apiErrorOptions = { ...options, status: 400 };
    
    super(message, apiErrorOptions);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, options?: ClientErrorOptions) {
    const apiErrorOptions = { ...options, status: 404 };
    
    super(message, apiErrorOptions);
    this.name = 'NotFoundError';
  }
}

export class TaskNotFoundError extends BaseError {
  constructor(message: string, options?: BaseErrorOptions) {
    super(message, options || {});
    this.name = 'TaskNotFoundError';
  }
}

export function fieldErrors(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}