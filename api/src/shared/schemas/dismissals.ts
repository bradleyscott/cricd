import myzod from 'myzod';
import MatchEventTypes from './matchEventTypes.js';
import { playerSchema } from './base.js';
import { matchEventSchema, battersAndBowlersSchema } from './matchEvents.js';

export const bowledEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.Bowled),
    })
  );

export const caughtEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.Caught),
      fielder: playerSchema.optional(),
      didCross: myzod.boolean().default(false),
    })
  );

export const lbwEventSchema = matchEventSchema.and(battersAndBowlersSchema).and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.LBW),
  })
);

export const runOutEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.RunOut),
      batter: playerSchema,
      fielder: playerSchema.optional(),
    })
  );

export const stumpedEventSchema = runOutEventSchema.omit(['type']).and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Stumped),
  })
);

export const doubleHitEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.DoubleHit),
    })
  );

export const hitWicketEventSchema = matchEventSchema
  .and(battersAndBowlersSchema)
  .and(
    myzod.object({
      type: myzod.literal(MatchEventTypes.HitWicket),
    })
  );

export const obstructionEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Obstruction),
    batter: playerSchema,
  })
);

export const timedOutEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.TimedOut),
    batter: playerSchema,
  })
);

export const retiredEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Retired),
    batter: playerSchema,
  })
);

export const retiredNotOutEventSchema = matchEventSchema.and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.RetiredNotOut),
    batter: playerSchema,
  })
);
