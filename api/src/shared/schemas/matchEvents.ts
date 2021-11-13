import myzod from 'myzod';
import MatchEventTypes from './matchEventTypes';
import { battersSchema, playerSchema, uuidSchema } from './base';

export const matchEventSchema = myzod.object({
  id: uuidSchema,
  match: uuidSchema,
  inning: uuidSchema,
  type: myzod.enum(MatchEventTypes),
  timestamp: myzod.date(),
  lastEventId: uuidSchema,
});

export const declarationEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Declaration),
  })
);

export const battersAndBowlersSchema = myzod.object({
  batters: battersSchema,
  bowler: playerSchema,
});
