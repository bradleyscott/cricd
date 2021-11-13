import { NextFunction, Request, Response, Router } from 'express';
import { AuthProvider, Controller } from '../shared/interfaces';
import log from '../shared/logger';

class AuthController implements Controller {
  path = '/auth';

  router = Router();

  private authProvider: AuthProvider;

  constructor(provider: AuthProvider) {
    this.authProvider = provider;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private login = async (
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    if (!request.body.email || !request.body.password) {
      const message = 'email and password are required';
      log.debug(message);
      return response.status(400).send(message);
    }

    log.debug(`Authenticating user ${request.body.email}`);
    const session = await this.authProvider.login(
      request.body.email,
      request.body.password
    );
    log.debug(`${request.body.email} successfully authenticated`);
    return response.status(200).send(session);
  };

  private register = async (
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    if (!request.body.email || !request.body.password) {
      const message = 'email and password are required';
      log.debug(message);
      return response.status(400).send(message);
    }

    log.debug(`Registering user ${request.body.email}`);
    const session = await this.authProvider.register(
      request.body.email,
      request.body.password
    );
    log.debug(`${request.body.email} successfully registered`);
    return response.status(200).send(session);
  };

  private logout = async (
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    const token = request.body.accessToken;
    if (!token) {
      const message = 'accessToken is required';
      log.debug(message);
      return response.status(400).send(message);
    }

    await this.authProvider.logout(token);
    log.debug(`Access token ${token} invalidated`);
    return response.status(200);
  };
}

export default AuthController;
