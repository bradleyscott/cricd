import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '../shared/middleware/validation.js';
import log from '../shared/logger.js';
import authMiddleware from '../shared/middleware/auth.js';
import { Controller, GenericEventProcessor } from '../shared/interfaces.js';
import { MatchEvent } from '../shared/types.js';

class EventsController implements Controller {
  path = '/events';

  router = Router();

  private processors: GenericEventProcessor<void>[] = [];

  constructor(processors: GenericEventProcessor<void>[]) {
    this.initializeRoutes();
    this.processors = processors;
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware,
      this.postEvent
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
