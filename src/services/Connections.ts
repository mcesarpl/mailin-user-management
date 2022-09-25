import { connect as mongooseConnect } from 'mongoose';
import { createClient, RedisClientType } from 'redis';
import config, { IConfig } from 'config';

class Connections {
  mongoClient!: typeof import('mongoose');
  redisClient!: RedisClientType;

  public async startDatabaseConnections(): Promise<void> {
    await this.startMongoDBConnection();
    await this.startRedisConnection();
  }

  public async closeConnections(): Promise<void> {
    if (this.mongoClient) {
      await this.mongoClient.disconnect();
    }

    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }

  public getConnections() {
    return {
      mongo: this.mongoClient,
      redis: this.redisClient,
    };
  }

  private async startMongoDBConnection(): Promise<void> {
    const dbConfig: IConfig = config.get('App.database');
    this.mongoClient = await mongooseConnect(dbConfig.get('mongo'));
  }

  private async startRedisConnection(): Promise<void> {
    const dbConfig: IConfig = config.get('App.database');

    this.redisClient = createClient({
      url: dbConfig.get('redis'),
    });
  }
}

export default new Connections();
