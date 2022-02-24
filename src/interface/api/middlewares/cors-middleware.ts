import cors from 'cors';
import { Express } from 'express';
import { injectable } from 'inversify';
import { IMiddleware } from './middleware';

@injectable()
export class CorsMiddleware implements IMiddleware {
  public configure(app: Express): void {
    app.use(cors());
  }
}
