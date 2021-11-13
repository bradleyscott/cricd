import { NextFunction, Request, Response } from 'express';
import log from '../logger';

function errorMiddleware(
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'An unknown error occurred';
  const logLevel = status >= 500 ? 'error' : 'debug';

  log[logLevel](error.message);
  response.status(status).send(message);
}

export default errorMiddleware;
