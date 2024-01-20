import { Request, Response, Router } from 'express';
import { Controller } from './interface.js';

class PingController implements Controller {
  public path = '/ping';

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getPing);
  }

  private getPing = (request: Request, response: Response) => {
    response.send('pong');
  };
}

export default PingController;
