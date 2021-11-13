export interface User {
  id: string;
  email?: string;
}

export interface Session {
  accessToken: string;
  expiresAt: Date;
  user: User | null;
}
