import 'express';

declare global {
  namespace Express {
    interface User {
      githubId: number;
      username?: string;
    }
  }
}

export {};
