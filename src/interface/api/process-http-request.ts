import express, { NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { ErrorMiddleware } from './middlewares/error-middleware';
import { BodyParserMiddleware } from './middlewares/body-parser-middleware';
import { RegisterRoutes } from './routes';
import * as swaggerUI from 'swagger-ui-express';
import { HttpStatusCode } from '../../infrastructure/http/http-status-code';
import { CorsMiddleware } from './middlewares/cors-middleware';
import { Settings } from '../../infrastructure/configurations/settings';

@injectable()
export class ProcessHttpRequest {
  private readonly bodyParserMiddleware: BodyParserMiddleware;

  private readonly errorMiddleware: ErrorMiddleware;

  private readonly corsMiddleware: CorsMiddleware;

  private readonly settings: Settings;

  constructor(
    @inject(BodyParserMiddleware) bodyParserMiddleware: BodyParserMiddleware,
    @inject(ErrorMiddleware) errorMiddleware: ErrorMiddleware,
    @inject(CorsMiddleware) corsMiddleware: CorsMiddleware,
    @inject(Settings) settings: Settings
  ) {
    this.bodyParserMiddleware = bodyParserMiddleware;
    this.errorMiddleware = errorMiddleware;
    this.corsMiddleware = corsMiddleware;
    this.settings = settings;
  }

  public async run() {
    const app = express();

    app.use('/docs', swaggerUI.serve, async (_req: express.Request, res: express.Response) => {
      return res.send(swaggerUI.generateHTML(await import('../../../swagger.json')));
    });

    this.corsMiddleware.configure(app);
    this.bodyParserMiddleware.configure(app);
    this.configureRoutes(app);
    this.errorMiddleware.configure(app);

    app.listen(this.settings.getPort(), () => {
      console.log(`Application starting at: ${this.settings.getPort()}`);
    });
  }

  private configureRoutes(app: express.Express): void {
    RegisterRoutes(app);

    app.use((request: express.Request, response: express.Response, next: NextFunction) => {
      console.log('Route not found', { path: request.path });

      response
        .status(HttpStatusCode.NOT_FOUND)
        .send({
          message: 'Route not Found',
        })
        .end();

      next();
    });
  }
}
