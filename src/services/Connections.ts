import { connect as mongooseConnect } from 'mongoose';
import { createClient, RedisClientType } from 'redis';
import config, { IConfig } from 'config';
import ElasticSearchFactory from '@src/factories/ElasticSearchFactory';
import { Client } from 'elasticsearch';
import { Sequelize } from 'sequelize';

class Connections {
  private mongoClient!: typeof import('mongoose');
  private redisClient!: RedisClientType;
  private elasticSearchClient!: Client;
  private postgres!: Sequelize;

  public async startDatabaseConnections(): Promise<void> {
    if (!this.mongoClient) {
      await this.startMongoDBConnection();
    }

    if (!this.redisClient) {
      await this.startRedisConnection();
    }

    if (!this.elasticSearchClient) {
      await this.startElasticSearchConnection();
    }

    if (!this.postgres) {
      await this.startPostgresConnection();
    }
  }

  public async closeConnections(): Promise<void> {
    if (this.mongoClient) {
      await this.mongoClient.disconnect();
    }

    if (this.redisClient) {
      await this.redisClient.quit();
    }

    if (this.postgres) {
      await this.postgres.close();
    }
  }

  public getConnections() {
    return {
      mongo: this.mongoClient,
      redis: this.redisClient,
      postgres: this.postgres,
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

    await this.redisClient.connect();
  }

  private async startElasticSearchConnection(): Promise<void> {
    await ElasticSearchFactory.start();
    this.elasticSearchClient = ElasticSearchFactory.get();
  }

  private async startPostgresConnection(): Promise<void> {
    const dbConfig: IConfig = config.get('App.database');
    this.postgres = new Sequelize(dbConfig.get('postgres'));
    await this.postgres.authenticate();
  }
}

export default new Connections();
