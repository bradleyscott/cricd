import ModernError from 'modern-errors';

export const ApiError = ModernError.subclass('ApiError');

export const MongoRepositoryError = ApiError.subclass('MongoRepositoryError', {
  props: { statusCode: 500 },
});

export const TypeValidationError = ApiError.subclass('TypeValidationError', {
  props: { statusCode: 400 },
});

export const ItemNotFoundError = ApiError.subclass('ItemNotFoundError', {
  props: { statusCode: 404 },
});

export const NoProcessorError = ApiError.subclass('NoProcessorError', {
  props: { statusCode: 500 },
});

export const MatchEventNotUniqueError = ApiError.subclass(
  'MatchEventNotUniqueError',
  { props: { statusCode: 400 } }
);

export const EventsNotSequentialError = ApiError.subclass(
  'EventsNotSequentialError',
  { props: { statusCode: 400 } }
);
