import { MatchEvent } from '../types';
import MongoRepository from './mongoRepository';

class EventsRepository extends MongoRepository<MatchEvent> {
  constructor(url: string, db: string) {
    super(url, db, 'matchEvents');
  }

  async insert(item: MatchEvent): Promise<MatchEvent> {
    return super.insert(item);
  }

  async update(id: string, item: MatchEvent): Promise<MatchEvent> {
    return super.update(id, item);
  }

  async upsert(id: string, item: MatchEvent): Promise<MatchEvent> {
    return super.upsert(id, item);
  }

  async delete(id: string): Promise<boolean> {
    return super.delete(id);
  }

  async get(filter?: any): Promise<MatchEvent[]> {
    return super.get(filter);
  }

  async getById(id: string): Promise<MatchEvent | null> {
    return super.getById(id);
  }
}

export default EventsRepository;
