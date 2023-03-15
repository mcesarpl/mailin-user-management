import { RedisClient as Client } from '@src/adapters/RedisClient';
import { RedisClientAdapter as ClientAdapter } from '@src/factories/RedisClientAdapterFactory';
/* import { MongoClient as Client } from '@src/adapters/MongoClient';
import { MongoClientAdapter as ClientAdapter } from '@src/factories/MongoClientAdapterFactory'; */
import { IDatabaseFactory, IUser } from '@src/interfaces';

class DatabaseClientFactory implements IDatabaseFactory {
  databaseFactory!: ClientAdapter;
  database!: Client<IUser>;

  public start() {
    this.databaseFactory = new ClientAdapter();
    this.database = this.databaseFactory.start();
  }

  public async close() {
    if (this.databaseFactory) {
      await this.databaseFactory.close();
    }
  }

  public get() {
    return this.database;
  }
}

export default new DatabaseClientFactory();
