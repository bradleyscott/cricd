import express from 'express';
import { Logger } from 'tslog';
import morgan from 'morgan';
import errorMiddleware from './shared/middleware/error.js';
import { Controller } from './shared/interfaces.js';

const log = new Logger();

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.app.use(errorMiddleware);
  }

  private initialiseMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan('short', { stream: { write: (m: string) => log.info(m) } })
    );
  }

  private initialiseControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      log.info(`Listening on port ${port}...`);
    });
  }
}

export default App;
