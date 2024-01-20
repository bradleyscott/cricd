enum MatchEventTypes {
  Runs = 'runs',

  // Extras
  NoBall = 'noBall',
  Wide = 'wide',
  LegByes = 'legByes',
  Byes = 'byes',
  PenaltyRuns = 'penaltyRuns',

  // Dismissals
  Bowled = 'bowled',
  Caught = 'caught',
  LBW = 'lbw',
  RunOut = 'runOut',
  Stumped = 'stumped',
  HitWicket = 'hitWicket',
  DoubleHit = 'doubleHit',
  TimedOut = 'timedOut',
  Obstruction = 'obstruction',

  RetiredNotOut = 'retiredNotOut',
  Retired = 'retired',
  Declaration = 'declaration',
}

export default MatchEventTypes;
