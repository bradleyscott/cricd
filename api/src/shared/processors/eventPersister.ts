import { EventsNotSequentialError, MatchEventNotUniqueError } from '../errors';
import { GenericEventProcessor, Repository } from '../interfaces';
import { MatchEvent } from '../types';

class EventPersister implements GenericEventProcessor<void> {
  private store: Repository<MatchEvent>;

  constructor(store: Repository<MatchEvent>) {
    this.store = store;
  }

  async processEvent(e: MatchEvent): Promise<void> {
    const matchEvents = await this.store.get({ match: e.match });

    if (!EventPersister.isEventUnique(matchEvents, e))
      throw new MatchEventNotUniqueError('MatchEvent is not unique', {
        props: { matchEvent: e },
      });

    if (!EventPersister.isEventSequential(matchEvents, e))
      throw new EventsNotSequentialError('MatchEvents are not sequential', {
        props: { matchEvent: e },
      });

    this.store.insert(e);
  }

  static isEventUnique(matchEvents: MatchEvent[], e: MatchEvent): boolean {
    return matchEvents.filter((me) => me.id === e.id).length === 0;
  }

  static isEventSequential(matchEvents: MatchEvent[], e: MatchEvent): boolean {
    if (matchEvents.length === 0) return true;
    const lastEvent = matchEvents[matchEvents.length - 1];
    return lastEvent.id === e.lastEventId;
  }
}

export default EventPersister;
