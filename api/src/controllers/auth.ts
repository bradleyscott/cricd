import { NextFunction, Request, Response, Router } from 'express';
import { log } from '@cricd/core/index.js';
import { AuthProvider } from '../auth/interfaces.js';
import { Controller } from './interface.js';
import { handleErrors } from './handleErrors.js';

class AuthController implements Controller {
  path = '/auth';

  router = Router();

  private authProvider: AuthProvider;

  constructor(provider: AuthProvider) {
    this.authProvider = provider;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, handleErrors(this.login));
    this.router.post(`${this.path}/register`, handleErrors(this.register));
    this.router.post(`${this.path}/logout`, handleErrors(this.logout));
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
    return response.status(200).send();
  };
}

export default AuthController;
