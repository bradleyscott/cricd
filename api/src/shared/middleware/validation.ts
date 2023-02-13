import { RequestHandler, NextFunction, Request, Response } from 'express';
import { validateSchema } from '../processors/utils.js';
import { MatchEvent } from '../types.js';

function validationMiddleware(): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const e = req.body as MatchEvent;
    try {
      validateSchema(e);
    } catch (err) {
      next(err);
    }
    next();
  };
}

export default validationMiddleware;
