import { ResultStatusEnum } from "./result-status-enum";

export class ResultNotFound {
  public readonly errorMessage: string;

  public readonly isError: false = false;

  public readonly status: ResultStatusEnum.NOT_FOUND = ResultStatusEnum.NOT_FOUND;

  public constructor(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
