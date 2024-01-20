import { NextFunction, Request, Response } from 'express';
import { MatchEvent } from '@cricd/core/types.js';
import { validateSchema } from '@cricd/core/schemas/index.js';

function validationMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const e = req.body as MatchEvent;
  try {
    validateSchema(e);
  } catch (err) {
    next(err);
  }
  next();
}

export default validationMiddleware;
