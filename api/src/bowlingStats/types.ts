import { MatchEvent, Player } from '../shared/types.js';

export type BowlingStats = {
  bowler: Player;
  match: string;
  inning: string;
  legalDeliveries: number;
  runs: number;
  wickets: MatchEvent[];
  extras: MatchEvent[];
  extrasConceded: number;
  average: number;
  economyRate: number;
  strikeRate: number;
  scoring: Map<number, number>;
  events: MatchEvent[];
};
