import { describe, it, expect, vi } from 'vitest';
import InningsStatsProcessor from './processor.js';
import { EventsRepository } from '../../services/index.js';
import MatchEventTypes from '../../schemas/matchEventTypes.js';
import { MatchEvent } from '../../types.js';
import * as testData from '../../fixtures/matchEvents.js';

const repository = new EventsRepository('mongodb://localhost:27017', 'cricd');
const processor = new InningsStatsProcessor(repository);
const match: string = 'e7bb1c44-cba2-4571-8b5a-13ec4165089f';
const inning: string = '80a8127d-b7fe-49f2-9562-eb9b68ce93af';

describe('processRuns', () => {
  it('a dot, single and boundary four', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([
        testData.dotBall,
        testData.single,
        testData.boundaryFour,
      ]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(5);
    expect(actual.legalDeliveries).toBe(3);
    expect(actual.wickets.length).toBe(0);
    expect(actual.over).toBe(0);
    expect(actual.overBall).toBe(3);
  });

  it('a dot, single, boundary four then a wicket', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([
        testData.dotBall,
        testData.single,
        testData.boundaryFour,
        testData.bowled,
      ]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(5);
    expect(actual.legalDeliveries).toBe(4);
    expect(actual.wickets.length).toBe(1);
    expect(actual.over).toBe(0);
    expect(actual.overBall).toBe(4);
    expect(actual.fallOfWickets.length).toBe(1);
    expect(actual.fallOfWickets[0].wicketNumber).toBe(1);
    expect(actual.fallOfWickets[0].runs).toBe(5);
  });

  it('runout when striker on the second run', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.runOutOfStriker]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(1);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });

  it('obstruction with no runs completed', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.obstruction]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processNoBall', () => {
  it('no ball without further runs', async () => {
    repository.get = vi.fn<MatchEvent[]>().mockResolvedValue([testData.noBall]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(1);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.NoBall]).toBe(1);
    expect(actual.wickets.length).toBe(0);
  });

  it('no ball boundary four', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.noBallFour]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(5);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.NoBall]).toBe(5);
    expect(actual.wickets.length).toBe(0);
  });

  it('runout on no ball', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.noBallStrikerRunout]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(2);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.NoBall]).toBe(2);
    expect(actual.wickets.length).toBe(1);
  });

  it('ball hit helmet but no runs taken', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.ballHitHelmet]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(5);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.extras[MatchEventTypes.PenaltyRuns]).toBe(5);
    expect(actual.wickets.length).toBe(0);
  });
});

describe('processWide', () => {
  it('wide without further runs', async () => {
    repository.get = vi.fn<MatchEvent[]>().mockResolvedValue([testData.wide]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(1);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.Wide]).toBe(1);
    expect(actual.wickets.length).toBe(0);
  });

  it('wide with single', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.wideWithSingle]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(2);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.Wide]).toBe(2);
    expect(actual.wickets.length).toBe(0);
  });

  it('wide with stumping', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.wideWithStumping]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(1);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.Wide]).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });

  it('wide with runout on second run', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.wideWithRunoutOnSecondRun]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(2);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.extras[MatchEventTypes.Wide]).toBe(2);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processLegBye', () => {
  it('leg bye single', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.legByeSingle]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(1);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.extras[MatchEventTypes.LegByes]).toBe(1);
    expect(actual.wickets.length).toBe(0);
  });
});

describe('processBye', () => {
  it('bye single', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.byeSingle]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(1);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.extras[MatchEventTypes.Byes]).toBe(1);
    expect(actual.wickets.length).toBe(0);
  });
});

describe('processBowled', () => {
  it('bowled', async () => {
    repository.get = vi.fn<MatchEvent[]>().mockResolvedValue([testData.bowled]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processCaught', () => {
  it('caught', async () => {
    repository.get = vi.fn<MatchEvent[]>().mockResolvedValue([testData.caught]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processLBW', () => {
  it('lbw', async () => {
    repository.get = vi.fn<MatchEvent[]>().mockResolvedValue([testData.lbw]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processStumped', () => {
  it('stumped', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.stumped]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processHitWicket', () => {
  it('hit wicket', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.hitWicket]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processDoubleHit', () => {
  it('double hit', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.doubleHit]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(1);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processTimedOut', () => {
  it('timed out', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.timedOut]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processRetiredNotOut', () => {
  it('retired hurt', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.retiredNotOut]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.wickets.length).toBe(0);
  });
});

describe('processRetired', () => {
  it('retired', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.retired]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.wickets.length).toBe(1);
  });
});

describe('processDeclaration', () => {
  it('declaration', async () => {
    repository.get = vi
      .fn<MatchEvent[]>()
      .mockResolvedValue([testData.declaration]);

    const actual = await processor.processStats(match, inning);
    expect(actual.runs).toBe(0);
    expect(actual.legalDeliveries).toBe(0);
    expect(actual.wickets.length).toBe(0);
  });
});
