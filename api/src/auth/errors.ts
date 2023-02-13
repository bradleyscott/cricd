import { ApiError } from '../shared/errors.js';

export const InvalidTokenError = ApiError.subclass('InvalidTokenError', {
  props: { statusCode: 401 },
});

export const AuthUnsuccessfulError = ApiError.subclass(
  'AuthUnsuccessfulError',
  {
    props: { statusCode: 401 },
  }
);
