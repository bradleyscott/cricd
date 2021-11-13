import MatchEventTypes from '../shared/schemas/matchEventTypes';
import { DeclarationEvent, MatchEvent } from '../shared/types';

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
  extras: Map<MatchEventTypes, number>;
  wickets: MatchEvent[];
  legalDeliveries: number;
  over: number;
  overBall: number;
  fallOfWickets: FallOfWicket[];
  declaration?: DeclarationEvent;
};