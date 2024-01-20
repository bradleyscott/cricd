import * as types from '../types.js';
import MatchEventTypes from '../schemas/matchEventTypes.js';

export const dotBall: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 0,
};

export const single: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
};

export const boundaryFour: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 4,
};

export const runOutOfStriker: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
  dismissal: {
    type: MatchEventTypes.RunOut,
    batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
  } as types.RunOutEvent,
};

export const runOutOfNonStriker: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
  dismissal: {
    type: MatchEventTypes.RunOut,
    batter: { id: '0f5a325b-b513-465c-8878-29e3d9933014', name: 'Non Striker' },
    fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
  } as types.RunOutEvent,
};

export const noBall: types.NoBallEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.NoBall,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 0,
  didBatsmanHitBall: false,
};

export const noBallFour: types.NoBallEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.NoBall,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 4,
  didBatsmanHitBall: true,
};

export const noBallSingleNotHit: types.NoBallEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.NoBall,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
  didBatsmanHitBall: false,
};

export const noBallStrikerRunout: types.NoBallEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.NoBall,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
  dismissal: {
    type: MatchEventTypes.RunOut,
    batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
  } as types.RunOutEvent,
  didBatsmanHitBall: true,
};

export const noBallNonStrikerRunout: types.NoBallEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.NoBall,
  batters: {
    striker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
    nonStriker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
  dismissal: {
    type: MatchEventTypes.RunOut,
    batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
  } as types.RunOutEvent,
  didBatsmanHitBall: true,
};

export const wide: types.WideEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Wide,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 0,
};

export const wideWithSingle: types.WideEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Wide,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
};

export const wideWithRunoutOnSecondRun: types.WideEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Wide,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
  dismissal: {
    type: MatchEventTypes.RunOut,
    fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
    batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
  } as types.RunOutEvent,
};

export const wideWithStumping: types.WideEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Wide,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 0,
  dismissal: {
    type: MatchEventTypes.Stumped,
    fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
  } as types.StumpedEvent,
};

export const legByeSingle: types.LegByeEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.LegByes,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
};

export const byeSingle: types.ByeEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Byes,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 1,
};

export const bowled: types.BowledEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Bowled,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
};

export const caught: types.CaughtEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Caught,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
  didCross: true,
};

export const lbw: types.LBWEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.LBW,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
};

export const stumped: types.StumpedEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Stumped,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  batter: {
    id: '0f5a325b-b513-465c-8878-29e3d9933014',
    name: 'Non Striker',
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  fielder: { id: '57d22026-d754-43dc-bd17-7cd84b976a63', name: 'Fielder' },
};

export const hitWicket: types.HitWicketEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.HitWicket,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
};

export const doubleHit: types.DoubleHitEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.DoubleHit,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
};

export const timedOut: types.TimedOutEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.TimedOut,
  batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
};

export const retiredNotOut: types.RetiredNotOutEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.RetiredNotOut,
  batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
};

export const retired: types.RetiredEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Retired,
  batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
};

export const obstruction: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 0,
  dismissal: {
    type: MatchEventTypes.Obstruction,
    batter: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
  } as types.ObstructionEvent,
};

export const declaration: types.DeclarationEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Declaration,
};

export const ballHitHelmet: types.RunsEvent = {
  id: '1fddfa3e-0722-477a-89b9-29935c7ebcee',
  timestamp: new Date(),
  lastEventId: 'f0c2980d-38de-4d37-85a3-16f3469b52ee',
  match: 'e7bb1c44-cba2-4571-8b5a-13ec4165089f',
  inning: '80a8127d-b7fe-49f2-9562-eb9b68ce93af',
  type: MatchEventTypes.Runs,
  batters: {
    striker: { id: '995075ac-a5d3-4b9c-b369-008c58ebc9a3', name: 'Striker' },
    nonStriker: {
      id: '0f5a325b-b513-465c-8878-29e3d9933014',
      name: 'Non Striker',
    },
  },
  bowler: { id: 'eaaff05a-4abb-4f35-b736-eb034aabbd23', name: 'Bowler' },
  runs: 0,
  penaltyRuns: {
    type: MatchEventTypes.PenaltyRuns,
    runs: 5,
  } as types.PenaltyRunsEvent,
};
