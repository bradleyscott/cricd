import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../shared/interfaces.js';
import log from '../shared/logger.js';
import BowlingStatsProcessor from './processor.js';

class BowlingStatsController implements Controller {
  path = '/match/:match/inning/:inning/bowler/:bowler';

  router = Router();

  private processor!: BowlingStatsProcessor;

  constructor(processor: BowlingStatsProcessor) {
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
    if (
      !request.params.match ||
      !request.params.inning ||
      !request.params.bowler
    ) {
      const message = 'match, inning and bowler parameters are required';
      log.debug(message);
      return response.status(400).send(message);
    }

    log.debug(
      `Getting bowling stats for match ${request.params.match}, inning ${request.params.inning} and bowler ${request.params.bowler}`
    );
    const stats = await this.processor.processStats(
      request.params.match,
      request.params.inning,
      request.params.bowler
    );
    log.debug('Successfully retrieved bowling stats');

    return response.status(200).json(stats);
  };
}

export default BowlingStatsController;
