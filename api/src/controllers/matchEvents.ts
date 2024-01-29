import { NextFunction, Request, Response, Router } from 'express';
import { log } from '@cricd/core/index.js';
import { GenericEventProcessor } from '@cricd/core/interfaces.js';
import { MatchEvent } from '@cricd/core/types.js';
import * as middleware from '../middleware/index.js';
import { handleErrors } from './handleErrors.js';
import { Controller } from './interface.js';
import { AuthProvider } from '../auth/interfaces.js';

class EventsController implements Controller {
  path = '/events';

  router = Router();

  private processors: GenericEventProcessor<void>[] = [];

  private authProvider: AuthProvider;

  constructor(
    processors: GenericEventProcessor<void>[],
    authProvider: AuthProvider
  ) {
    this.authProvider = authProvider;
    this.initializeRoutes();
    this.processors = processors;
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      this.authProvider.middleware.bind(this.authProvider),
      middleware.validationMiddleware,
      handleErrors(this.postEvent)
    );
  }

  private postEvent = async (
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    const matchEvent = <MatchEvent>request.body;

    log.debug(`Starting processing of event with id ${matchEvent.id}`);
    await Promise.all(this.processors.map((p) => p.processEvent(matchEvent)));
    log.debug('Succesfully completed event processing');

    return response.status(201).send();
  };
}

export default EventsController;
