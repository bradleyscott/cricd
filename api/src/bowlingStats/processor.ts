import EventsRepository from '../shared/services/eventsRepository.js';
import MatchEventTypes from '../shared/schemas/matchEventTypes.js';
import { EventProcessor } from '../shared/interfaces.js';
import * as types from '../shared/types.js';
import { BowlingStats } from './types.js';
import { getProcessor, updateMap } from '../shared/processors/utils.js';

class BowlingStatsProcessor implements EventProcessor<BowlingStats> {
  private eventsRepository: EventsRepository;

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  async processStats(
    match: string,
    inning: string,
    bowler: string
  ): Promise<BowlingStats> {
    const events = await this.eventsRepository.get({ match, inning, bowler });

    const stats = events.map(this.processEvent).reduce(this.reduceIncrements, {
      match,
      inning,
      bowler: { id: bowler },
      legalDeliveries: 0,
      runs: 0,
      wickets: [],
      extras: [],
      extrasConceded: 0,
      scoring: new Map(),
      events: [],
      average: 0,
      economyRate: 0,
      strikeRate: 0,
    });

    stats.average =
      stats.wickets.length > 0 ? stats.runs / stats.wickets.length : 0;
    stats.strikeRate =
      stats.wickets.length > 0
        ? (stats.legalDeliveries + stats.extras.length) / stats.wickets.length
        : 0;
    stats.economyRate = (stats.runs / stats.legalDeliveries) * 6;

    return stats;
  }

  reduceIncrements(current: BowlingStats, increment: Partial<BowlingStats>) {
    return {
      match: current.match,
      inning: current.inning,
      bowler: current.bowler,
      legalDeliveries:
        current.legalDeliveries + (increment.legalDeliveries || 0),
      runs: current.runs + (increment.runs || 0),
      wickets: [...current.wickets, ...(increment.wickets || [])],
      extras: [...current.extras, ...(increment.extras || [])],
      extrasConceded: current.extrasConceded + (increment.extrasConceded || 0),
      scoring: updateMap(current.scoring, increment.scoring),
      events: [...current.events, ...(increment.events || [])],
      average: 0,
      economyRate: 0,
      strikeRate: 0,
    };
  }

  processEvent(e: types.MatchEvent): Partial<BowlingStats> {
    const fn = getProcessor<types.MatchEvent, BowlingStats>(e, this);
    return fn(e);
  }

  processRuns(e: types.RunsEvent): Partial<BowlingStats> {
    return {
      runs: e.runs + 1,
      legalDeliveries: 1,
      scoring: new Map<number, number>().set(e.runs, e.runs),
    };
  }

  processNoBall(e: types.NoBallEvent): Partial<BowlingStats> {
    return {
      runs: e.runs + 1,
      extrasConceded: e.runs + 1,
      extras: [e],
      scoring: new Map<number, number>().set(e.runs, e.runs),
    };
  }

  processWide(e: types.WideEvent): Partial<BowlingStats> {
    const increment = {
      runs: e.runs + 1,
      extrasConceded: e.runs + 1,
      extras: [e],
      scoring: new Map<number, number>().set(e.runs, e.runs),
      wickets: [] as types.MatchEvent[],
    };

    if (e.dismissal && e.dismissal.type === MatchEventTypes.Stumped)
      increment.wickets.push(e.dismissal);
    else if (e.dismissal && e.dismissal.type === MatchEventTypes.HitWicket)
      increment.wickets = [e.dismissal];

    return increment;
  }

  processLegBye(_e: types.LegByeEvent): Partial<BowlingStats> {
    return { legalDeliveries: 1 };
  }

  processBye(_e: types.ByeEvent): Partial<BowlingStats> {
    return { legalDeliveries: 1 };
  }

  processPenaltyRuns(_e: types.PenaltyRunsEvent): Partial<BowlingStats> {
    return {};
  }

  processWicket(e: types.MatchEvent): Partial<BowlingStats> {
    return { legalDeliveries: 1, wickets: [e] };
  }

  processBowled(e: types.BowledEvent): Partial<BowlingStats> {
    return this.processWicket(e);
  }

  processCaught(e: types.CaughtEvent): Partial<BowlingStats> {
    return this.processWicket(e);
  }

  processLBW(e: types.LBWEvent): Partial<BowlingStats> {
    return this.processWicket(e);
  }

  processStumped(e: types.StumpedEvent): Partial<BowlingStats> {
    return this.processWicket(e);
  }

  processHitWicket(e: types.HitWicketEvent): Partial<BowlingStats> {
    return this.processWicket(e);
  }

  processDoubleHit(e: types.DoubleHitEvent): Partial<BowlingStats> {
    return this.processWicket(e);
  }

  processTimedOut(_e: types.TimedOutEvent): Partial<BowlingStats> {
    return {};
  }

  processRetiredNotOut(_e: types.RetiredNotOutEvent): Partial<BowlingStats> {
    return {};
  }

  processRetired(_e: types.RetiredEvent): Partial<BowlingStats> {
    return {};
  }

  processDeclaration(_e: types.DeclarationEvent): Partial<BowlingStats> {
    return {};
  }
}

export default BowlingStatsProcessor;
