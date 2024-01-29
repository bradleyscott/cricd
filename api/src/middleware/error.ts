import { NextFunction, Request, Response } from 'express';
import { log } from '@cricd/core/index.js';

function errorMiddleware(
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'An unknown error occurred';
  const logLevel = status >= 500 ? 'error' : 'debug';

  log[logLevel](error);
  response.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
