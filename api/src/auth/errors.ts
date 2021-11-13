import { ApiError } from '../shared/errors';

export const InvalidTokenError = ApiError.subclass('InvalidTokenError', {
  props: { statusCode: 401 },
});

export const AuthUnsuccessfulError = ApiError.subclass(
  'AuthUnsuccessfulError',
  {
    props: { statusCode: 401 },
  }
);
