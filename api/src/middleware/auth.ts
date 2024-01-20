import { NextFunction, Request, Response } from 'express';
import { errors } from '@cricd/core/index.js';
import SupabaseAuthProvider from '../auth/service.js';

const authProvider = new SupabaseAuthProvider(
  process.env.SUPABASE_URL ? process.env.SUPABASE_URL : '',
  process.env.SUPABASE_CLIENT_KEY ? process.env.SUPABASE_CLIENT_KEY : ''
);

async function authMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  if (!token)
    return next(new errors.AuthorizationError('No Bearer token provided'));

  try {
    const user = await authProvider.validateToken(token);
    request.headers.user = user?.id;
  } catch (e) {
    return next(
      new errors.AuthorizationError(
        (e as Error).message || 'Authorization failed'
      )
    );
  }
  return next();
}

export default authMiddleware;
