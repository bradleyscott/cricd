import MongoRepository from '@cricd/core/services/mongoRepository.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as jose from 'jose';
import { NextFunction, Request, Response } from 'express';
import { AuthorizationError } from '@cricd/core/errors.js';
import { AuthProvider, Session, User, UserWithHash } from './interfaces.js';
import { AuthUnsuccessfulError, InvalidTokenError } from './errors.js';

class MongoAuthProvider implements AuthProvider {
  private repository: MongoRepository<UserWithHash>;

  private jwtSecret: Uint8Array;

  constructor(repository: MongoRepository<UserWithHash>, jwtSecret: string) {
    this.repository = repository;
    this.jwtSecret = new TextEncoder().encode(jwtSecret);
  }

  async validateToken(token: string): Promise<User> {
    try {
      const {
        payload: { user },
      } = await jose.jwtVerify<User>(token, this.jwtSecret);
      const found = await this.repository.getById((user as User).id);
      if (found) return user as User;

      throw new Error('Access token verification failed');
    } catch (error) {
      throw new InvalidTokenError('Token validation failed', {
        cause: error,
        props: { token },
      });
    }
  }

  isPasswordValid = (user: UserWithHash, password: string) =>
    bcrypt.compareSync(password, user.hash) ? user : false;

  hashPassword = (password: string) => bcrypt.hashSync(password, 10);

  createSession = async (user: User): Promise<Session> => {
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + 60 * 60 * 1000);
    const jwt = new jose.SignJWT({
      user: {
        id: user.id,
        email: user.email,
      },
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(issuedAt)
      .setExpirationTime(expiresAt)
      .sign(this.jwtSecret);

    return {
      accessToken: await jwt,
      user: {
        id: user.id,
        email: user.email,
      },
      expiresAt,
    };
  };

  async login(email: string, password: string): Promise<Session> {
    const matchingUsers = await this.repository.get({ email });
    const authed = await Promise.any(
      matchingUsers.map((u) => this.isPasswordValid(u, password))
    );
    if (authed) return this.createSession(authed);

    throw new AuthUnsuccessfulError('Login failed', {
      cause: 'Invalid credentials',
      props: { email },
    });
  }

  async register(email: string, password: string): Promise<Session> {
    try {
      const hash = this.hashPassword(password);
      const registered = await this.repository.insert({
        id: uuid(),
        email,
        hash,
      });

      return this.createSession(registered);
    } catch (error) {
      throw new AuthUnsuccessfulError('Registration failed', {
        cause: error,
        props: { email },
      });
    }
  }

  async middleware(
    request: Request,
    _response: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = request.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    if (!token) return next(new AuthorizationError('No Bearer token provided'));

    try {
      const user = await this.validateToken(token);
      request.headers.user = user?.id;
    } catch (e) {
      return next(
        new AuthorizationError((e as Error).message || 'Authorization failed')
      );
    }
    return next();
  }
}

export default MongoAuthProvider;
