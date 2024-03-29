import { Infer } from 'myzod';
import * as base from './schemas/base.js';
import runsEventSchema from './schemas/runs.js';
import * as extras from './schemas/extras.js';
import * as dismissals from './schemas/dismissals.js';
import {
  matchEventSchema,
  declarationEventSchema,
} from './schemas/matchEvents.js';

export type PlayerRef = Infer<typeof base.personRefSchema>;
export type BattersRef = Infer<typeof base.battersRefSchema>;
export type TeamRef = Infer<typeof base.teamRefSchema>;
export type MatchInfo = Infer<typeof base.matchInfoSchema>;

export type MatchEvent = Infer<typeof matchEventSchema>;
export type DeclarationEvent = Infer<typeof declarationEventSchema>;
export type RunsEvent = Infer<typeof runsEventSchema>;

// Extras
export type ByeEvent = Infer<typeof extras.byesEventSchema>;
export type LegByeEvent = Infer<typeof extras.legByesEventSchema>;
export type WideEvent = Infer<typeof extras.wideEventSchema>;
export type NoBallEvent = Infer<typeof extras.noBallEventSchema>;
export type PenaltyRunsEvent = Infer<typeof extras.penaltyRunsEventSchema>;

// Dismissals
export type BowledEvent = Infer<typeof dismissals.bowledEventSchema>;
export type CaughtEvent = Infer<typeof dismissals.caughtEventSchema>;
export type LBWEvent = Infer<typeof dismissals.lbwEventSchema>;
export type RunOutEvent = Infer<typeof dismissals.runOutEventSchema>;
export type StumpedEvent = Infer<typeof dismissals.stumpedEventSchema>;
export type ObstructionEvent = Infer<typeof dismissals.obstructionEventSchema>;
export type HitWicketEvent = Infer<typeof dismissals.hitWicketEventSchema>;
export type DoubleHitEvent = Infer<typeof dismissals.doubleHitEventSchema>;
export type TimedOutEvent = Infer<typeof dismissals.timedOutEventSchema>;
export type RetiredEvent = Infer<typeof dismissals.retiredEventSchema>;
export type RetiredNotOutEvent = Infer<
  typeof dismissals.retiredNotOutEventSchema
>;
