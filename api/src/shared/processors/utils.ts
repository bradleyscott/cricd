import { NoProcessorError, TypeValidationError } from '../errors.js';
import { EventProcessor } from '../interfaces.js';
import MatchEventTypes from '../schemas/matchEventTypes.js';
import * as types from '../types.js';
import runsEventSchema from '../schemas/runs.js';
import {
  byesEventSchema,
  legByesEventSchema,
  noBallEventSchema,
  penaltyRunsEventSchema,
  wideEventSchema,
} from '../schemas/extras.js';
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
} from '../schemas/dismissals.js';
import { declarationEventSchema } from '../schemas/matchEvents.js';

const updateMap = <T>(
  current: Map<T, number>,
  increment: Map<T, number> | undefined
): Map<T, number> => {
  if (!increment) return current;

  const updated = new Map<T, number>(current);
  increment.forEach((value, key) => {
    if (value > 0) updated.set(key, current.get(key) || 0 + value);
  });
  return updated;
};

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

const getProcessor = <T extends types.MatchEvent, U>(
  e: T,
  p: EventProcessor<U>
): ((x: any) => Partial<U>) => {
  switch (e.type) {
    case MatchEventTypes.Runs:
      return p.processRuns;
    case MatchEventTypes.NoBall:
      return p.processNoBall;
    case MatchEventTypes.Wide:
      return p.processWide;
    case MatchEventTypes.LegByes:
      return p.processLegBye;
    case MatchEventTypes.Byes:
      return p.processBye;
    case MatchEventTypes.PenaltyRuns:
      return p.processPenaltyRuns;
    case MatchEventTypes.Bowled:
      return p.processBowled;
    case MatchEventTypes.Caught:
      return p.processCaught;
    case MatchEventTypes.LBW:
      return p.processLBW;
    case MatchEventTypes.Stumped:
      return p.processStumped;
    case MatchEventTypes.HitWicket:
      return p.processHitWicket;
    case MatchEventTypes.DoubleHit:
      return p.processDoubleHit;
    case MatchEventTypes.TimedOut:
      return p.processTimedOut;
    case MatchEventTypes.RetiredNotOut:
      return p.processRetiredNotOut;
    case MatchEventTypes.Retired:
      return p.processRetired;
    case MatchEventTypes.Declaration:
      return p.processDeclaration;
    default:
      return () => {
        throw new NoProcessorError('No processor found for event', {
          props: { e },
        });
      };
  }
};

export { updateMap, getProcessor, validateSchema };
