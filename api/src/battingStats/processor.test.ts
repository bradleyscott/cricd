import BattingStatsProcessor from './processor';
import EventsRepository from '../shared/services/eventsRepository';
import * as testData from '../fixtures/matchEvents';
import {
  ObstructionEvent,
  RetiredEvent,
  RunOutEvent,
  TimedOutEvent,
} from '../shared/types';

jest.mock('../shared/services/eventsRepository.ts');

const repository = new EventsRepository('mongodb://localhost:27017', 'cricd');
const processor = new BattingStatsProcessor(repository);
const match: string = 'e7bb1c44-cba2-4571-8b5a-13ec4165089f';
const inning: string = '80a8127d-b7fe-49f2-9562-eb9b68ce93af';
const batter: string = '995075ac-a5d3-4b9c-b369-008c58ebc9a3';

describe('processRuns', () => {
  it('a dot, single and boundary four', async () => {
    repository.get = jest
      .fn()
      .mockReturnValue([
        testData.dotBall,
        testData.single,
        testData.boundaryFour,
      ]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.events.length).toBe(3);
    expect(actual.ballsFaced).toBe(3);
    expect(actual.runs).toBe(5);
    expect(actual.scoring.get(4)).toBe(4);
    expect(actual.scoring.get(1)).toBe(1);
  });

  it('runout when striker on the second run', async () => {
    repository.get = jest.fn().mockReturnValue([testData.runOutOfStriker]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(1);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.scoring.get(1)).toBe(1);
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as RunOutEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });

  it('runout when non striker', async () => {
    repository.get = jest.fn().mockReturnValue([testData.runOutOfNonStriker]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
    expect(actual.scoring.get(1)).toBeFalsy();
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as RunOutEvent).batter).toMatchObject({
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    });
  });

  it('obstruction with no runs completed', async () => {
    repository.get = jest.fn().mockReturnValue([testData.obstruction]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.scoring.get(1)).toBeFalsy();
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as ObstructionEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });
});

describe('processNoBall', () => {
  it('no ball without further runs', async () => {
    repository.get = jest.fn().mockReturnValue([testData.noBall]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.runs).toBe(0);
  });

  it('batsman hits the ball and takes runs on no ball', async () => {
    repository.get = jest.fn().mockReturnValue([testData.noBallFour]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.runs).toBe(4);
    expect(actual.scoring.get(4)).toBe(4);
  });

  it('batsman does not hit the ball and takes runs on no ball', async () => {
    repository.get = jest.fn().mockReturnValue([testData.noBallSingleNotHit]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.runs).toBe(0);
  });

  it('runout as striker after hitting the ball on no ball', async () => {
    repository.get = jest.fn().mockReturnValue([testData.noBallStrikerRunout]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(1);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as RunOutEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });

  it('runout of non-striker', async () => {
    repository.get = jest
      .fn()
      .mockReturnValue([testData.noBallNonStrikerRunout]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as RunOutEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });
});

describe('processWide', () => {
  it('wide without further runs', async () => {
    repository.get = jest.fn().mockReturnValue([testData.wide]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
  });

  it('wide with single', async () => {
    repository.get = jest.fn().mockReturnValue([testData.wideWithSingle]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
  });

  it('wide with stumping', async () => {
    repository.get = jest.fn().mockReturnValue([testData.wideWithStumping]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });

  it('wide with runout on second run', async () => {
    repository.get = jest
      .fn()
      .mockReturnValue([testData.wideWithRunoutOnSecondRun]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as RunOutEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });
});

describe('processLegBye', () => {
  it('leg bye single', async () => {
    repository.get = jest.fn().mockReturnValue([testData.legByeSingle]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
  });
});

describe('processBye', () => {
  it('bye single', async () => {
    repository.get = jest.fn().mockReturnValue([testData.byeSingle]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
  });
});

describe('processBowled', () => {
  it('bowled', async () => {
    repository.get = jest.fn().mockReturnValue([testData.bowled]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });
});

describe('processCaught', () => {
  it('caught', async () => {
    repository.get = jest.fn().mockReturnValue([testData.caught]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });
});

describe('processLBW', () => {
  it('lbw', async () => {
    repository.get = jest.fn().mockReturnValue([testData.lbw]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });
});

describe('processStumped', () => {
  it('stumped', async () => {
    repository.get = jest.fn().mockReturnValue([testData.stumped]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });
});

describe('processHitWicket', () => {
  it('hit wicket', async () => {
    repository.get = jest.fn().mockReturnValue([testData.hitWicket]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });
});

describe('processDoubleHit', () => {
  it('double hit', async () => {
    repository.get = jest.fn().mockReturnValue([testData.doubleHit]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(1);
    expect(actual.dismissal).toBeTruthy();
  });
});

describe('processTimedOut', () => {
  it('timed out', async () => {
    repository.get = jest.fn().mockReturnValue([testData.timedOut]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as TimedOutEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });
});

describe('processRetiredNotOut', () => {
  it('retired hurt', async () => {
    repository.get = jest.fn().mockReturnValue([testData.retiredNotOut]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
    expect(actual.dismissal).toBeFalsy();
  });
});

describe('processRetired', () => {
  it('retired', async () => {
    repository.get = jest.fn().mockReturnValue([testData.retired]);

    const actual = await processor.processStats(match, inning, batter);
    expect(actual.runs).toBe(0);
    expect(actual.ballsFaced).toBe(0);
    expect(actual.dismissal).toBeTruthy();
    expect((actual.dismissal as RetiredEvent).batter).toMatchObject({
      id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3',
      name: 'Striker',
    });
  });
});
