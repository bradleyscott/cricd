export interface User {
  id: string;
  email?: string;
}

export interface Session {
  accessToken: string;
  expiresAt: Date;
  user: User | null;
}

export interface AuthProvider {
  validateToken(token: string): Promise<User>;
  login(user: string, password: string): Promise<Session>;
  register(user: string, password: string): Promise<Session>;
  logout(token: string): Promise<void>;
}
