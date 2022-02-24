import { ResultStatusEnum } from "./result-status-enum";

export class ResultSuccess<T> {
  public readonly data: T;

  public readonly isError: false = false;

  public readonly status: ResultStatusEnum.SUCCESS = ResultStatusEnum.SUCCESS;

  public constructor(result: T) {
    this.data = result;
  }
}
