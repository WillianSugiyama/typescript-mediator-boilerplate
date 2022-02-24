import { FieldErrors } from 'tsoa';

/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 */
export type UUID = string;

/**
 * @isInt
 * @minimum 0
 * @maximum 100
 */
export type SmallInt = number;

export interface ErrorResult {
  message: string;
}

export interface ValidationErrorResult extends ErrorResult {
  details: FieldErrors;
}
