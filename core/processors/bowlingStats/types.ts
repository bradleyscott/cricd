import { MatchEvent, PlayerRef } from '../../types.js';

export type BowlingStats = {
  bowler: PlayerRef;
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
  scoring: Record<number, number>;
  events: MatchEvent[];
};
