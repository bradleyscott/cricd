import MatchEventTypes from '../../schemas/matchEventTypes.js';
import { DeclarationEvent, MatchEvent } from '../../types.js';

export type FallOfWicket = {
  runs: number;
  wicketNumber: number;
  over: number;
  overBall: number;
  event: MatchEvent;
};

export type InningsStats = {
  match: string;
  inning: string;
  runs: number;
  extras: Record<Partial<MatchEventTypes>, number>;
  wickets: MatchEvent[];
  legalDeliveries: number;
  over: number;
  overBall: number;
  fallOfWickets: FallOfWicket[];
  declaration?: DeclarationEvent;
};
