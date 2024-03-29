import { ApiError } from '@cricd/core/errors.js';

export const InvalidTokenError = ApiError.subclass('InvalidTokenError', {
  props: { status: 401 },
});

export const AuthUnsuccessfulError = ApiError.subclass(
  'AuthUnsuccessfulError',
  {
    props: { status: 401 },
  }
);
