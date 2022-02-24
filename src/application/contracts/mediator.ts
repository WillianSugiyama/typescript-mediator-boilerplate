import { Container as ContainerInstance, inject, injectable } from 'inversify';
import { Container } from '../../infrastructure/configurations/types';
import { CommandHandler } from './command-handler';
import { Result } from './result/result';

@injectable()
export class Mediator {
  @inject(Container)
  private readonly container!: ContainerInstance;

  public async send<T extends object, R = undefined>(request: T): Promise<Result<R>> {
    const handlerName = Symbol.for(`${request.constructor.name}Handler`);

    const handler = this.container.get<CommandHandler<T, R>>(handlerName);

    return handler.handle(request);
  }
}
