import { Container, decorate, injectable } from 'inversify';
import { Controller } from 'tsoa';
import { Mediator } from '../../application/contracts/mediator';
import { HealthcheckCommandHandler } from '../../application/healthcheck/healthcheck-command-handler';
import { HealthCheckController } from '../../interface/api/controllers/healthcheck-controller';
import { BodyParserMiddleware } from '../../interface/api/middlewares/body-parser-middleware';
import { CorsMiddleware } from '../../interface/api/middlewares/cors-middleware';
import { ErrorMiddleware } from '../../interface/api/middlewares/error-middleware';
import { ProcessHttpRequest } from '../../interface/api/process-http-request';
import { Settings } from './settings';

import * as Types from './types';

const container: Container = new Container();

decorate(injectable(), Controller);

// contracts
container.bind(Types.Mediator).to(Mediator);

// interface
container.bind(ProcessHttpRequest).toSelf();
container.bind(BodyParserMiddleware).toSelf();
container.bind(ErrorMiddleware).toSelf();
container.bind(CorsMiddleware).toSelf();

// controllers
container.bind(HealthCheckController).toSelf();

// settings
container.bind(Settings).toSelf();

// values
container.bind(Types.Container).toConstantValue(container);
container.bind(Types.Envs).toConstantValue(process.env);

// handlers
container.bind(Types.HealthcheckCommandHandler).to(HealthcheckCommandHandler);

export { container, container as iocContainer };
