import myzod from 'myzod';
import { obstructionEventSchema, runOutEventSchema } from './dismissals.js';
import { penaltyRunsEventSchema } from './extras.js';
import { battersAndBowlersRefSchema, matchEventSchema } from './matchEvents.js';
import MatchEventTypes from './matchEventTypes.js';

const runsEventSchema = matchEventSchema.and(battersAndBowlersRefSchema).and(
  myzod.object({
    type: myzod.literal(MatchEventTypes.Runs),
    runs: myzod.number().min(0).default(0),
    dismissal: runOutEventSchema.or(obstructionEventSchema).optional(),
    penaltyRuns: penaltyRunsEventSchema.optional(),
  })
);

export default runsEventSchema;
