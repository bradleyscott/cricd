import { NextFunction, Request, Response, Router } from 'express';
import { log } from '@cricd/core/index.js';
import { MatchInfo } from '@cricd/core/types.js';
import { MongoRepository } from '@cricd/core/services/index.js';
import { matchInfoSchema } from '@cricd/core/schemas/index.js';
import { Controller } from './interface.js';
import { authMiddleware } from '../middleware/index.js';
import { handleErrors } from './handleErrors.js';

function validationMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const e = req.body as MatchInfo;
  try {
    matchInfoSchema.parse(e);
  } catch (err) {
    next(err);
  }
  next();
}

class MatchController implements Controller {
  path = '/match';

  router = Router();

  private repository: MongoRepository<MatchInfo>;

  constructor(repository: MongoRepository<MatchInfo>) {
    this.initializeRoutes();
    this.repository = repository;
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware,
      handleErrors(this.postMatch)
    );
  }

  private postMatch = async (
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    const matchInfo = <MatchInfo>request.body;

    log.debug(`Saving match with id ${matchInfo.id}`);
    await this.repository.upsert(matchInfo.id, matchInfo);
    log.debug('Succesfully saved match', matchInfo);

    return response.status(201).send();
  };
}

export default MatchController;
