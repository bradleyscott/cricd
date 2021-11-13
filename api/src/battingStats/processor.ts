import { EventProcessor } from '../shared/interfaces';
import EventsRepository from '../shared/services/eventsRepository';
import { BattingStats } from './types';
import * as types from '../shared/types';
import { getProcessor, updateMap } from '../shared/processors/utils';
import MatchEventTypes from '../shared/schemas/matchEventTypes';

class BattingStatsProcessor implements EventProcessor<BattingStats> {
  private eventsRepository: EventsRepository;

  private batter!: types.Player;

  constructor(eventsRepository: EventsRepository) {
    this.eventsRepository = eventsRepository;
  }

  async processStats(
    match: string,
    inning: string,
    batter: string
  ): Promise<BattingStats> {
    this.batter = { id: batter };
    const events = await this.eventsRepository.get({
      match,
      inning,
      batters: { striker: batter },
    });

    const stats = events.map(this.processEvent).reduce(this.reduceIncrements, {
      match,
      inning,
      dismissal: undefined,
      batter: { id: batter },
      runs: 0,
      ballsFaced: 0,
      scoring: new Map(),
      strikeRate: 0,
      events: [],
    });

    stats.strikeRate =
      stats.ballsFaced > 0 ? (stats.runs / stats.ballsFaced) * 100 : 0;
    return stats;
  }

  reduceIncrements(current: BattingStats, increment: Partial<BattingStats>) {
    return {
      match: current.match,
      inning: current.inning,
      batter: current.batter,
      dismissal: increment.dismissal || current.dismissal,
      runs: current.runs + (increment.runs || 0),
      ballsFaced: current.ballsFaced + (increment.ballsFaced || 0),
      scoring: updateMap(current.scoring, increment.scoring),
      strikeRate: 0,
      events: [...current.events, ...(increment.events || [])],
    };
  }

  processEvent(e: types.MatchEvent): Partial<BattingStats> {
    const fn = getProcessor<types.MatchEvent, BattingStats>(e, this);
    return fn(e);
  }

  processRuns(e: types.RunsEvent): Partial<BattingStats> {
    const increment: Partial<BattingStats> = {};

    if (e.dismissal && e.dismissal.batter.id === e.batters.striker.id) {
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.batter.id === e.batters.nonStriker.id
    ) {
      increment.dismissal = e.dismissal;
      return increment;
    }

    increment.runs = e.runs;
    increment.ballsFaced = 1;
    increment.scoring = new Map().set(e.runs, e.runs);
    return increment;
  }

  processNoBall(e: types.NoBallEvent): Partial<BattingStats> {
    const increment: Partial<BattingStats> = {};

    if (e.dismissal && e.dismissal.type === MatchEventTypes.DoubleHit) {
      increment.dismissal = e.dismissal;
    }

    if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.RunOut &&
      this.batter.id === (<types.RunOutEvent>e.dismissal).batter.id &&
      this.batter.id === e.batters.striker.id
    ) {
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.RunOut &&
      this.batter.id === (<types.RunOutEvent>e.dismissal).batter.id
    ) {
      increment.dismissal = e.dismissal;
      return increment;
    }

    if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.Obstruction &&
      this.batter.id === (<types.ObstructionEvent>e.dismissal).batter.id &&
      this.batter.id === e.batters.striker.id
    ) {
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.Obstruction &&
      this.batter.id === (<types.ObstructionEvent>e.dismissal).batter.id
    ) {
      increment.dismissal = e.dismissal;
      return increment;
    }

    if (e.didBatsmanHitBall) {
      increment.runs = e.runs;
      increment.scoring = new Map().set(e.runs, e.runs);
    }
    increment.ballsFaced = 1;
    return increment;
  }

  processWide(e: types.WideEvent): Partial<BattingStats> {
    const increment: Partial<BattingStats> = {};

    if (e.dismissal) increment.dismissal = e.dismissal;

    if (
      e.dismissal &&
      (e.dismissal.type === MatchEventTypes.Stumped ||
        e.dismissal.type === MatchEventTypes.HitWicket)
    ) {
      increment.ballsFaced = 1;
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.RunOut &&
      (<types.RunOutEvent>e.dismissal).batter.id === e.batters.striker.id
    ) {
      increment.ballsFaced = 1;
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.Obstruction &&
      (<types.ObstructionEvent>e.dismissal).batter.id === e.batters.striker.id
    ) {
      increment.ballsFaced = 1;
      increment.dismissal = e.dismissal;
    }

    return increment;
  }

  processLegBye(e: types.LegByeEvent): Partial<BattingStats> {
    const increment = { ballsFaced: 1 } as Partial<BattingStats>;

    if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.RunOut &&
      (<types.RunOutEvent>e.dismissal).batter.id === e.batters.striker.id
    ) {
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.Obstruction &&
      (<types.ObstructionEvent>e.dismissal).batter.id === e.batters.striker.id
    ) {
      increment.dismissal = e.dismissal;
    }

    return increment;
  }

  processBye(e: types.ByeEvent): Partial<BattingStats> {
    const increment = { ballsFaced: 1 } as Partial<BattingStats>;

    if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.RunOut &&
      (<types.RunOutEvent>e.dismissal).batter.id === e.batters.striker.id
    ) {
      increment.dismissal = e.dismissal;
    } else if (
      e.dismissal &&
      e.dismissal.type === MatchEventTypes.Obstruction &&
      (<types.ObstructionEvent>e.dismissal).batter.id === e.batters.striker.id
    ) {
      increment.dismissal = e.dismissal;
    }

    return increment;
  }

  processPenaltyRuns(_e: types.PenaltyRunsEvent): Partial<BattingStats> {
    return {};
  }

  processBowled(e: types.BowledEvent): Partial<BattingStats> {
    return { ballsFaced: 1, dismissal: e };
  }

  processCaught(e: types.CaughtEvent): Partial<BattingStats> {
    return { ballsFaced: 1, dismissal: e };
  }

  processLBW(e: types.LBWEvent): Partial<BattingStats> {
    return { ballsFaced: 1, dismissal: e };
  }

  processStumped(e: types.StumpedEvent): Partial<BattingStats> {
    return { ballsFaced: 1, dismissal: e };
  }

  processHitWicket(e: types.HitWicketEvent): Partial<BattingStats> {
    return { ballsFaced: 1, dismissal: e };
  }

  processDoubleHit(e: types.DoubleHitEvent): Partial<BattingStats> {
    return { ballsFaced: 1, dismissal: e };
  }

  processTimedOut(e: types.TimedOutEvent): Partial<BattingStats> {
    return { dismissal: e };
  }

  processRetiredNotOut(_e: types.RetiredNotOutEvent): Partial<BattingStats> {
    return {};
  }

  processRetired(e: types.RetiredEvent): Partial<BattingStats> {
    return { dismissal: e };
  }

  processDeclaration(_e: types.DeclarationEvent): Partial<BattingStats> {
    return {};
  }
}

export default BattingStatsProcessor;
