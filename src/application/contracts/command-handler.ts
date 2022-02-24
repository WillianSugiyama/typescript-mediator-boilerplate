import { Result } from './result/result';

export interface CommandHandler<C, R = undefined> {
  handle(request: C): Promise<Result<R>>;
}
