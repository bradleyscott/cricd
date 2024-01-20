import { MatchEvent, PlayerRef } from '../../types.js';

export type BattingStats = {
  batter: PlayerRef;
  inning: string;
  match: string;
  dismissal?: MatchEvent;
  runs: number;
  ballsFaced: number;
  scoring: Record<number, number>;
  strikeRate: number;
  events: MatchEvent[];
};
