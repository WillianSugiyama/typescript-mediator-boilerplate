import { ResultError } from './result-error';
import { ResultSuccess } from './result-success';
import { ResultNotFound } from './result-not-found';
import { ResultForbidden } from './result-forbidden';

export type Result<S = undefined> = ResultSuccess<S> | ResultError | ResultNotFound;
