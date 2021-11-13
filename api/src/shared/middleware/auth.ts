import { NextFunction, Request, Response } from 'express';
import SupabaseAuthProvider from '../../auth/service';
import log from '../logger';

const authProvider = new SupabaseAuthProvider(
  process.env.SUPABASE_URL ? process.env.SUPABASE_URL : '',
  process.env.SUPABASE_CLIENT_KEY ? process.env.SUPABASE_CLIENT_KEY : ''
);

// eslint-disable-next-line consistent-return
async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '').trim();
  if (!token)
    return response
      .status(401)
      .json({ message: 'No Bearer token provided', status: 401 });

  let user;
  try {
    user = await authProvider.validateToken(token);
  } catch (error: any) {
    if (error.status) return response.status(error.status).send(error.message);
    log.error(`Failed to validate Bearer token: ${error.message}`);
    return response.status(500).send(error.message);
  }

  request.headers.user = user?.id;
  next();
}

export default authMiddleware;
