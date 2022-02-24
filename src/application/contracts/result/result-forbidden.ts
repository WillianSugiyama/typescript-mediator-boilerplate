import { ResultStatusEnum } from './result-status-enum';

export class ResultForbidden {
  public readonly errorMessage: string;

  public readonly isError: false = false;

  public readonly status: ResultStatusEnum.FORBIDDEN = ResultStatusEnum.FORBIDDEN;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
