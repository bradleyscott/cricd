import { NextFunction, Request, Response } from 'express';
import { MatchEvent } from '@cricd/core/types.js';
import { validateSchema } from '@cricd/core/schemas/index.js';
import { TypeValidationError } from '@cricd/core/errors.js';

function validationMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const e = req.body as MatchEvent;
  try {
    validateSchema(e);
  } catch (err) {
    next(
      new TypeValidationError('MatchEvent is not in the expected format', {
        cause: err,
      })
    );
  }
  next();
}

export default validationMiddleware;
