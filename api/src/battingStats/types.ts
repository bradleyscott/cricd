import { MatchEvent, Player } from '../shared/types.js';

export type BattingStats = {
  batter: Player;
  inning: string;
  match: string;
  dismissal?: MatchEvent;
  runs: number;
  ballsFaced: number;
  scoring: Map<number, number>;
  strikeRate: number;
  events: MatchEvent[];
};
