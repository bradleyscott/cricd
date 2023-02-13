import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuthProvider } from '../shared/interfaces.js';
import { AuthUnsuccessfulError, InvalidTokenError } from './errors.js';
import { Session, User } from './interfaces.js';

class SupabaseAuthProvider implements AuthProvider {
  private client: SupabaseClient;

  constructor(url: string, clientKey: string) {
    this.client = createClient(url, clientKey);
  }

  async validateToken(token: string): Promise<User> {
    const { user, error } = await this.client.auth.api.getUser(token);
    if (error || !user)
      throw new InvalidTokenError('Token validation failed', {
        cause: error,
        props: { token },
      });
    return user;
  }

  async login(email: string, password: string): Promise<Session> {
    const { session, error } = await this.client.auth.signIn({
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
    const { user, session, error } = await this.client.auth.signUp({
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
    await this.client.auth.api.signOut(token);
  }
}

export default SupabaseAuthProvider;
