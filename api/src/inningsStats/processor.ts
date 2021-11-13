import EventsRepository from '../shared/services/eventsRepository';
import { EventProcessor } from '../shared/interfaces';
import { FallOfWicket, InningsStats } from './types';
import * as types from '../shared/types';
import { getProcessor, updateMap } from '../shared/processors/utils';

class InningsStatsProcessor implements EventProcessor<InningsStats> {
  private eventsRepository: EventsRepository;

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  async processStats(match: string, inning: string): Promise<InningsStats> {
    const events = await this.eventsRepository.get({ match, inning });

    const reducer = (
      current: InningsStats,
      increment: Partial<InningsStats>,
      index: number
    ) => {
      const runs = current.runs + (increment.runs || 0);
      const extras = updateMap(current.extras, increment.extras);
      const wickets = [...current.wickets, ...(increment.wickets || [])];
      const legalDeliveries =
        current.legalDeliveries + (increment.legalDeliveries || 0);
      const over = Math.floor(legalDeliveries / 6);
      const overBall = legalDeliveries % 6;

      const stats: InningsStats = {
        match,
        inning,
        runs,
        extras,
        wickets,
        legalDeliveries,
        over,
        overBall,
        declaration: increment.declaration,
        fallOfWickets: [],
      };
      stats.fallOfWickets = this.updateFallOfWickets(
        current,
        stats,
        events[index]
      );
      return stats;
    };
    const stats = events.map(this.processEvent).reduce(reducer, {
      match,
      inning,
      runs: 0,
      extras: new Map(),
      wickets: [],
      legalDeliveries: 0,
      over: 0,
      overBall: 0,
      fallOfWickets: [],
    });

    return stats as InningsStats;
  }

  private updateFallOfWickets(
    current: Partial<InningsStats>,
    stats: InningsStats,
    e: types.MatchEvent
  ): FallOfWicket[] {
    const updated = current.fallOfWickets ? [...current.fallOfWickets] : [];

    if (stats.wickets && stats.wickets.length > 0)
      updated.push({
        runs: stats.runs,
        wicketNumber: stats.wickets.length,
        over: stats.over,
        overBall: stats.overBall,
        event: e,
      });

    return updated;
  }

  processEvent(e: types.MatchEvent): Partial<InningsStats> {
    const fn = getProcessor<types.MatchEvent, InningsStats>(e, this);
    return fn(e);
  }

  processRuns(e: types.RunsEvent): Partial<InningsStats> {
    const penalties = e.penaltyRuns
      ? this.processPenaltyRuns(e.penaltyRuns)
      : {};

    return {
      legalDeliveries: 1,
      runs: e.runs + (penalties.runs || 0),
      wickets: e.dismissal ? [e.dismissal] : undefined,
    };
  }

  processExtra(
    e: types.NoBallEvent | types.WideEvent | types.ByeEvent | types.LegByeEvent
  ): Partial<InningsStats> {
    const penalties = e.penaltyRuns
      ? this.processPenaltyRuns(e.penaltyRuns)
      : {};

    const extras = new Map([[e.type, e.runs]]);
    const penaltyExtras = penalties.extras ? penalties.extras : new Map();
    const extrasAndPenaltyExtras = new Map([...extras, ...penaltyExtras]);

    return {
      legalDeliveries: 1,
      runs: e.runs + (penalties.runs || 0),
      wickets: e.dismissal ? [e.dismissal] : undefined,
      extras: extrasAndPenaltyExtras,
    };
  }

  processNoBall(e: types.NoBallEvent): Partial<InningsStats> {
    const x = this.processExtra(e);
    return { ...x, runs: (x.runs || 0) + 1 };
  }

  processWide(e: types.WideEvent): Partial<InningsStats> {
    const x = this.processExtra(e);
    return { ...x, runs: (x.runs || 0) + 1 };
  }

  processLegBye(e: types.LegByeEvent): Partial<InningsStats> {
    return this.processExtra(e);
  }

  processBye(e: types.ByeEvent): Partial<InningsStats> {
    return this.processExtra(e);
  }

  processPenaltyRuns(e: types.PenaltyRunsEvent): Partial<InningsStats> {
    return {
      runs: e.runs,
      extras: new Map([[e.type, e.runs]]),
    };
  }

  processBowled(e: types.BowledEvent): Partial<InningsStats> {
    return {
      legalDeliveries: 1,
      wickets: [e],
    };
  }

  processCaught(e: types.CaughtEvent): Partial<InningsStats> {
    return {
      legalDeliveries: 1,
      wickets: [e],
    };
  }

  processLBW(e: types.LBWEvent): Partial<InningsStats> {
    return {
      legalDeliveries: 1,
      wickets: [e],
    };
  }

  processStumped(e: types.StumpedEvent): Partial<InningsStats> {
    return {
      legalDeliveries: 1,
      wickets: [e],
    };
  }

  processHitWicket(e: types.HitWicketEvent): Partial<InningsStats> {
    return {
      legalDeliveries: 1,
      wickets: [e],
    };
  }

  processDoubleHit(e: types.DoubleHitEvent): Partial<InningsStats> {
    return {
      legalDeliveries: 1,
      wickets: [e],
    };
  }

  processTimedOut(e: types.TimedOutEvent): Partial<InningsStats> {
    return { wickets: [e] };
  }

  processRetiredNotOut(_e: types.RetiredNotOutEvent): Partial<InningsStats> {
    return {};
  }

  processRetired(e: types.RetiredEvent): Partial<InningsStats> {
    return {
      wickets: [e],
    };
  }

  processDeclaration(e: types.DeclarationEvent): Partial<InningsStats> {
    return {
      declaration: e,
    };
  }
}

export default InningsStatsProcessor;
