import { Express, NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { ValidateError } from 'tsoa';
import { HttpStatusCode } from '../../../infrastructure/http/http-status-code';
import { ErrorResult, ValidationErrorResult } from '../../types';
import { IMiddleware } from './middleware';

@injectable()
export class ErrorMiddleware implements IMiddleware {
  public configure(app: Express): void {
    app.use(
      (error: unknown, _request: Request, response: Response<ErrorResult | ValidationErrorResult>, next: NextFunction): Response | void => {
        if (error instanceof ValidateError) {
          return response.status(HttpStatusCode.BAD_REQUEST).json({
            message: 'Invalid Request',
            details: error?.fields,
          });
        }

        console.log('DEU ERRO', error);

        if (error instanceof Error) {
          if (error.message === 'Unauthorized') {
            return response.status(HttpStatusCode.UNAUTHORIZED).json({ message: error.message });
          }
          return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error',
          });
        }

        next();
      }
    );
  }
}
