import { inject, injectable } from 'inversify';
import { Settings } from '../../infrastructure/configurations/settings';
import { CommandHandler } from '../contracts/command-handler';
import { Result } from '../contracts/result/result';
import { ResultSuccess } from '../contracts/result/result-success';
import { HealthcheckCommand } from './healthcheck-command';

@injectable()
export class HealthcheckCommandHandler implements CommandHandler<HealthcheckCommand, string> {
  @inject(Settings)
  private readonly settings!: Settings;

  public async handle(request: HealthcheckCommand): Promise<Result<string>> {
    return new ResultSuccess(`Ok, server running at port: ${this.settings.getPort()} + ${request.whoami}`);
  }
}
