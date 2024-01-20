import { NoProcessorError } from '../errors.js';
import { EventProcessor } from '../interfaces.js';
import MatchEventTypes from '../schemas/matchEventTypes.js';
import * as types from '../types.js';

const updateRecord = <T extends string | number | symbol>(
  current: Record<T, number>,
  increment: Record<T, number> | undefined
): Record<T, number> => {
  if (!increment) return current;

  const updated = { ...current };
  Object.keys(increment).forEach((k) => {
    const key = k as T;
    const value = increment[key];
    if (value > 0) updated[key] = current[key] || 0 + value;
  });
  return updated;
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

export { updateRecord, getProcessor };
