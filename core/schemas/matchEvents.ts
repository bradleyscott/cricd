import myzod from 'myzod';
import MatchEventTypes from './matchEventTypes.js';
import { battersRefSchema, personRefSchema, uuidSchema } from './base.js';

export const matchEventSchema = myzod.object({
  id: uuidSchema,
  match: uuidSchema,
  inning: uuidSchema,
  type: myzod.enum(MatchEventTypes),
  timestamp: myzod.date(),
  lastEventId: uuidSchema.optional(),
});

export const declarationEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Declaration),
  })
);

export const battersAndBowlersRefSchema = myzod.object({
  batters: battersRefSchema,
  bowler: personRefSchema,
});
