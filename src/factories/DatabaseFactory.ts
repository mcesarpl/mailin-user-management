/* import redisClientFactory from '@src/factories/RedisClientFactory'; */
import mongoClientFactory from '@src/factories/MongoClientFactory';
import { IDatabase, IDatabaseFactory } from '@src/interfaces';

class DatabaseFactory implements IDatabaseFactory {
  databaseFactory!: mongoClientFactory;
  database!: IDatabase<unknown, unknown>;

  async start() {
    this.databaseFactory = new mongoClientFactory();
    this.database = await this.databaseFactory.start();
  }

  async close() {
    if (this.databaseFactory) {
      await this.databaseFactory.close();
    }
  }

  get() {
    return this.database;
  }
}

export default new DatabaseFactory();
