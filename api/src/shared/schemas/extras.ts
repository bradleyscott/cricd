import myzod from 'myzod';
import MatchEventTypes from './matchEventTypes.js';
import {
  doubleHitEventSchema,
  hitWicketEventSchema,
  obstructionEventSchema,
  runOutEventSchema,
  stumpedEventSchema,
} from './dismissals.js';
import { matchEventSchema, battersAndBowlersSchema } from './matchEvents.js';

export const penaltyRunsEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.PenaltyRuns),
    runs: myzod.number().min(1).default(5),
  })
);

export const byesEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.Byes),
      runs: myzod.number().min(1),
      dismissal: runOutEventSchema.or(obstructionEventSchema).optional(),
      penaltyRuns: penaltyRunsEventSchema.optional(),
    })
  );

export const legByesEventSchema = byesEventSchema.omit(['type']).and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.LegByes),
  })
);

export const noBallEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.NoBall),
      runs: myzod.number().min(0).default(0),
      didBatsmanHitBall: myzod.boolean(),
      dismissal: runOutEventSchema
        .or(doubleHitEventSchema)
        .or(obstructionEventSchema)
        .optional(),
      penaltyRuns: penaltyRunsEventSchema.optional(),
    })
  );

export const wideEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.Wide),
      runs: myzod.number().min(0).default(0),
      dismissal: runOutEventSchema
        .or(stumpedEventSchema)
        .or(obstructionEventSchema)
        .or(hitWicketEventSchema)
        .optional(),
      penaltyRuns: penaltyRunsEventSchema.optional(),
    })
  );
