/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';

export const handleErrors = (
  fn: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<Response<any, Record<string, any>>>
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await fn(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};
