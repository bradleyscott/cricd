import myzod from 'myzod';
import { obstructionEventSchema, runOutEventSchema } from './dismissals';
import { penaltyRunsEventSchema } from './extras';
import { battersAndBowlersSchema, matchEventSchema } from './matchEvents';
import MatchEventTypes from './matchEventTypes';

const runsEventSchema = matchEventSchema.and(battersAndBowlersSchema).and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Runs),
    runs: myzod.number().min(0).default(0),
    dismissal: runOutEventSchema.or(obstructionEventSchema).optional(),
    penaltyRuns: penaltyRunsEventSchema.optional(),
  })
);

export default runsEventSchema;
