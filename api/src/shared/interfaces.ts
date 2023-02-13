import { Router } from 'express';
import { Session, User } from '../auth/interfaces.js';
import * as types from './types.js';

export interface AuthProvider {
  validateToken(token: string): Promise<User>;
  login(user: string, password: string): Promise<Session>;
  register(user: string, password: string): Promise<Session>;
  logout(token: string): Promise<void>;
}

export interface Controller {
  path: string;
  router: Router;
}

export interface GenericEventProcessor<T> {
  processEvent(e: types.MatchEvent): Partial<T>;
}

export interface EventProcessor<T> extends GenericEventProcessor<T> {
  processRuns(e: types.RunsEvent): Partial<T>;

  // Extras
  processNoBall(e: types.NoBallEvent): Partial<T>;
  processWide(e: types.WideEvent): Partial<T>;
  processLegBye(e: types.LegByeEvent): Partial<T>;
  processBye(e: types.ByeEvent): Partial<T>;
  processPenaltyRuns(e: types.PenaltyRunsEvent): Partial<T>;

  // Common dismissals
  processBowled(e: types.BowledEvent): Partial<T>;
  processCaught(e: types.CaughtEvent): Partial<T>;
  processLBW(e: types.LBWEvent): Partial<T>;
  processStumped(e: types.StumpedEvent): Partial<T>;
  processHitWicket(e: types.HitWicketEvent): Partial<T>;
  processDoubleHit(e: types.DoubleHitEvent): Partial<T>;
  processTimedOut(e: types.TimedOutEvent): Partial<T>;

  processRetiredNotOut(e: types.RetiredNotOutEvent): Partial<T>;
  processRetired(e: types.RetiredEvent): Partial<T>;
  processDeclaration(e: types.DeclarationEvent): Partial<T>;
}

export interface Repository<T> {
  insert(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  upsert(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  get(filter?: Partial<T>): Promise<T[]>;
  getById(id: string): Promise<T | null>;
}
