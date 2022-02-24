import { inject, injectable } from 'inversify';
import { Controller, Get, Query, Response, Route, Tags } from 'tsoa';
import { Mediator } from '../../../application/contracts/mediator';
import { HealthcheckCommand } from '../../../application/healthcheck/healthcheck-command';
import { HttpStatusCode } from '../../../infrastructure/http/http-status-code';
import { ErrorResult } from '../../types';
import { handleResult } from '../handle-result';

import * as Types from '../../../infrastructure/configurations/types';

@injectable()
@Route('/v1')
export class HealthCheckController extends Controller {
  private readonly mediator: Mediator;

  constructor(@inject(Types.Mediator) mediator: Mediator) {
    super();
    this.mediator = mediator;
  }

  @Tags('Healthcheck')
  @Get('/healthcheck')
  @Response<ErrorResult>(HttpStatusCode.BAD_REQUEST)
  @Response<ErrorResult>(HttpStatusCode.INTERNAL_SERVER_ERROR)
  @Response<ErrorResult>(HttpStatusCode.NOT_FOUND)
  public async healthCheck(@Query() whoami: string): Promise<any | ErrorResult> {
    const healthCheckHandlerResult = await this.mediator.send(new HealthcheckCommand({ whoami }));

    const { data, statusCode } = handleResult(healthCheckHandlerResult);

    this.setStatus(statusCode);

    return data;
  }
}
