import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthProvider } from '../auth/interfaces.js';
import { AuthUnsuccessfulError, InvalidTokenError } from './errors.js';
import { Session, User } from './interfaces.js';

class SupabaseAuthProvider implements AuthProvider {
  private client: SupabaseClient;

  constructor(url: string, clientKey: string) {
    this.client = createClient(url, clientKey, {});
  }

  async validateToken(token: string): Promise<User> {
    const {
      data: { user },
      error,
    } = await this.client.auth.getUser(token);
    if (error || !user)
      throw new InvalidTokenError('Token validation failed', {
        cause: error,
        props: { token },
      });
    return user;
  }

  async login(email: string, password: string): Promise<Session> {
    const {
      data: { session },
      error,
    } = await this.client.auth.signInWithPassword({
      email,
      password,
    });
    if (error)
      throw new AuthUnsuccessfulError('Login failed', {
        cause: error,
        props: { email },
      });

    const sessionExpires = new Date();
    const secondsUntilExpiry = session?.expires_in || 0;
    sessionExpires.setSeconds(sessionExpires.getSeconds() + secondsUntilExpiry);

    return {
      accessToken: session?.access_token,
      user: {
        id: session?.user?.id,
        email: session?.user?.email,
      } as User,
      expiresAt: sessionExpires,
    } as Session;
  }

  async register(email: string, password: string): Promise<Session> {
    const {
      data: { user, session },
      error,
    } = await this.client.auth.signUp({
      email,
      password,
    });
    if (error)
      throw new AuthUnsuccessfulError('Registration failed', {
        cause: error,
        props: { email },
      });

    return {
      accessToken: session?.access_token,
      user: {
        id: user?.id,
        email: user?.email,
      } as User,
      expiresAt: session?.expires_at ? new Date(session.expires_at) : undefined,
    } as Session;
  }

  async logout(token: string): Promise<void> {
    const { error } = await this.client.auth.admin.signOut(token);
    if (error)
      throw new InvalidTokenError('Token invalidation failed', {
        cause: error,
        props: { token },
      });
  }
}

export default SupabaseAuthProvider;
