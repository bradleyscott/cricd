import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../shared/interfaces';
import InningsStatsProcessor from './processor';
import log from '../shared/logger';

class InningStatsController implements Controller {
  path = '/match/:match/inning/:inning';

  router = Router();

  private processor!: InningsStatsProcessor;

  constructor(processor: InningsStatsProcessor) {
    this.initializeRoutes();
    this.processor = processor;
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getStats);
  }

  private getStats = async (
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    if (!request.params.match || !request.params.inning) {
      const message = 'match and inning parameters are required';
      log.debug(message);
      return response.status(400).send(message);
    }

    log.debug(
      `Getting inning stats for match ${request.params.match}, inning ${request.params.inning}`
    );
    const stats = await this.processor.processStats(
      request.params.match,
      request.params.inning
    );
    log.debug('Successfully retrieved inning stats');

    return response.status(200).json(stats);
  };
}

export default InningStatsController;