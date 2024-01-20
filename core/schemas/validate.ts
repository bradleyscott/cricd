import { NoProcessorError, TypeValidationError } from '../errors.js';
import runsEventSchema from './runs.js';
import {
  byesEventSchema,
  legByesEventSchema,
  noBallEventSchema,
  penaltyRunsEventSchema,
  wideEventSchema,
} from './extras.js';
import {
  bowledEventSchema,
  caughtEventSchema,
  doubleHitEventSchema,
  hitWicketEventSchema,
  lbwEventSchema,
  retiredEventSchema,
  retiredNotOutEventSchema,
  stumpedEventSchema,
  timedOutEventSchema,
} from './dismissals.js';
import { declarationEventSchema } from './matchEvents.js';
import * as types from '../types.js';
import MatchEventTypes from './matchEventTypes.js';

const validateSchema = (e: types.MatchEvent) => {
  try {
    switch (e.type) {
      case MatchEventTypes.Runs:
        runsEventSchema.parse(e);
        break;
      case MatchEventTypes.NoBall:
        noBallEventSchema.parse(e);
        break;
      case MatchEventTypes.Wide:
        wideEventSchema.parse(e);
        break;
      case MatchEventTypes.LegByes:
        legByesEventSchema.parse(e);
        break;
      case MatchEventTypes.Byes:
        byesEventSchema.parse(e);
        break;
      case MatchEventTypes.PenaltyRuns:
        penaltyRunsEventSchema.parse(e);
        break;
      case MatchEventTypes.Bowled:
        bowledEventSchema.parse(e);
        break;
      case MatchEventTypes.Caught:
        caughtEventSchema.parse(e);
        break;
      case MatchEventTypes.LBW:
        lbwEventSchema.parse(e);
        break;
      case MatchEventTypes.Stumped:
        stumpedEventSchema.parse(e);
        break;
      case MatchEventTypes.HitWicket:
        hitWicketEventSchema.parse(e);
        break;
      case MatchEventTypes.DoubleHit:
        doubleHitEventSchema.parse(e);
        break;
      case MatchEventTypes.TimedOut:
        timedOutEventSchema.parse(e);
        break;
      case MatchEventTypes.RetiredNotOut:
        retiredNotOutEventSchema.parse(e);
        break;
      case MatchEventTypes.Retired:
        retiredEventSchema.parse(e);
        break;
      case MatchEventTypes.Declaration:
        declarationEventSchema.parse(e);
        break;
      default:
        throw new NoProcessorError('No processor found for event', {
          props: { e },
        });
    }
  } catch (err) {
    throw new TypeValidationError('MatchEvent failed schema validation', {
      cause: err,
      props: { e },
    });
  }
};

export default validateSchema;
