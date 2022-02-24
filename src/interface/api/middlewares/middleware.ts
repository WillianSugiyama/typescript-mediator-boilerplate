import { Express } from 'express';

export interface IMiddleware {
  configure(app: Express): void;
}
