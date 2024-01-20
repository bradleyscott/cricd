import myzod from 'myzod';
import MatchEventTypes from './matchEventTypes.js';
import { personRefSchema } from './base.js';
import { matchEventSchema, battersAndBowlersRefSchema } from './matchEvents.js';

export const bowledEventSchema = matchEventSchema
  .and(battersAndBowlersRefSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.Bowled),
    })
  );

export const caughtEventSchema = matchEventSchema
  .and(battersAndBowlersRefSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.Caught),
      fielder: personRefSchema.optional(),
      didCross: myzod.boolean().default(false),
    })
  );

export const lbwEventSchema = matchEventSchema
  .and(battersAndBowlersRefSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.LBW),
    })
  );

export const runOutEventSchema = matchEventSchema
  .and(battersAndBowlersRefSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.RunOut),
      batter: personRefSchema,
      fielder: personRefSchema.optional(),
    })
  );

export const stumpedEventSchema = runOutEventSchema.omit(['type']).and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Stumped),
  })
);

export const doubleHitEventSchema = matchEventSchema
  .and(battersAndBowlersRefSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.DoubleHit),
    })
  );

export const hitWicketEventSchema = matchEventSchema
  .and(battersAndBowlersRefSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.HitWicket),
    })
  );

export const obstructionEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Obstruction),
    batter: personRefSchema,
  })
);

export const timedOutEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.TimedOut),
    batter: personRefSchema,
  })
);

export const retiredEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Retired),
    batter: personRefSchema,
  })
);

export const retiredNotOutEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.RetiredNotOut),
    batter: personRefSchema,
  })
);
