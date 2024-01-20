import ModernError from 'modern-errors';

export const ApiError = ModernError.subclass('ApiError');

export const MongoRepositoryError = ApiError.subclass('MongoRepositoryError', {
  props: { status: 500 },
});

export const TypeValidationError = ApiError.subclass('TypeValidationError', {
  props: { status: 400 },
});

export const ItemNotFoundError = ApiError.subclass('ItemNotFoundError', {
  props: { status: 404 },
});

export const NoProcessorError = ApiError.subclass('NoProcessorError', {
  props: { status: 500 },
});

export const MatchEventNotUniqueError = ApiError.subclass(
  'MatchEventNotUniqueError',
  { props: { status: 400 } }
);

export const EventsNotSequentialError = ApiError.subclass(
  'EventsNotSequentialError',
  { props: { status: 400 } }
);

export const AuthorizationError = ApiError.subclass('AuthorizationError', {
  props: { status: 401 },
});
