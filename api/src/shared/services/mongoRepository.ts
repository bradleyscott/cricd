import { MongoClient, Collection, Document } from 'mongodb';
import log from '../logger';
import { ItemNotFoundError, MongoRepositoryError } from '../errors';
import { Repository } from '../interfaces';

class MongoRepository<T> implements Repository<T> {
  private client: MongoClient;

  private collection!: Collection;

  constructor(url: string, db: string, collection: string) {
    this.client = new MongoClient(url);
    this.connectToDb(db, collection);
  }

  private async connectToDb(dbName: string, collection: string) {
    try {
      await this.client.connect();
    } catch (e: any) {
      log.error(`Failed to connect to mongodb: ${e.message}`);
      throw new MongoRepositoryError('Failed to connect to mongodb', {
        cause: e,
      });
    }

    const db = this.client.db(dbName);
    this.collection = db.collection(collection);
    log.debug(
      `Connected to mongo '${dbName}' db and '${collection}' collection`
    );
  }

  async insert(item: T): Promise<T> {
    const result = await this.collection.insertOne(item as Document);

    if (!result.acknowledged)
      throw new MongoRepositoryError('Failed to insert item', {
        props: { item },
      });

    return item;
  }

  async update(id: string, item: T): Promise<T> {
    const result = await this.collection.updateOne({ id }, { $set: item });

    if (!result.acknowledged)
      throw new MongoRepositoryError('Failed to update item', {
        props: { id, item },
      });

    if (result.modifiedCount === 0)
      throw new ItemNotFoundError('Item not found', { props: { id } });

    return item;
  }

  async upsert(id: string, item: T): Promise<T> {
    const result = await this.collection.updateOne(
      { id },
      { $set: item },
      { upsert: true }
    );

    if (!result.acknowledged || result.upsertedCount === 0)
      throw new MongoRepositoryError('Failed to update item', {
        props: { id, item },
      });

    return item;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ id });

    if (!result.acknowledged)
      throw new MongoRepositoryError('Failed to delete item', {
        props: { id },
      });

    if (result.deletedCount === 0) return false;

    return true;
  }

  async get(filter?: Partial<T>): Promise<T[]> {
    const result = await this.collection.find({ ...filter }).toArray();
    return result.map((x) => x as T);
  }

  async getById(id: string): Promise<T | null> {
    const result = await this.collection.findOne({ id });
    if (!result) return null;
    return result as T;
  }
}

export default MongoRepository;
