import { Result } from '../../application/contracts/result/result';
import { ResultStatusEnum } from '../../application/contracts/result/result-status-enum';
import { HttpStatusCode } from '../../infrastructure/http/http-status-code';
import { ErrorResult } from '../types';

export const handleResult = <T>(result: Result<T>): { statusCode: number; data: T | ErrorResult } => {
  if (result.status === ResultStatusEnum.NOT_FOUND) {
    return {
      data: { message: result.errorMessage },
      statusCode: HttpStatusCode.NOT_FOUND,
    };
  }

  if (result.status === ResultStatusEnum.ERROR) {
    console.log('ERRO');
    return {
      data: { message: result.errorMessage },
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
  }

  if (result.data === undefined) {
    return {
      data: result.data,
      statusCode: HttpStatusCode.NO_CONTENT,
    };
  }

  return {
    data: result.data,
    statusCode: HttpStatusCode.SUCCESS,
  };
};
