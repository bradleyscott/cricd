import { NextFunction, Request, Response, Router } from 'express';
import BattingStatsProcessor from './processor.js';
import log from '../shared/logger.js';
import { Controller } from '../shared/interfaces.js';

class BattingStatsController implements Controller {
  path = '/match/:match/inning/:inning/batter/:batter';

  router = Router();

  private processor!: BattingStatsProcessor;

  constructor(processor: BattingStatsProcessor) {
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
      !request.params.batter
    ) {
      const message = 'match, inning and batter parameters are required';
      log.debug(message);
      return response.status(400).send(message);
    }

    log.debug(
      `Getting batting stats for match ${request.params.match}, inning ${request.params.inning} and batter ${request.params.batter}`
    );
    const stats = await this.processor.processStats(
      request.params.match,
      request.params.inning,
      request.params.batter
    );
    log.debug('Successfully retrieved batting stats');

    return response.status(200).json(stats);
  };
}

export default BattingStatsController;
