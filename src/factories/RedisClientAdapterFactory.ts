import { RedisClient } from '@src/adapters/RedisClient';
import { RedisClientType } from 'redis';
import { redisUser } from '@src/models/redis/user';
import { IClientDatabase } from '@src/interfaces';
import { IUser } from '@src/interfaces';
import Connections from '@src/services/Connections';

export class RedisClientAdapter implements IClientDatabase {
  client!: RedisClientType;

  public start() {
    this.client = Connections.getConnections().redis;

    const redisClient = new RedisClient<IUser>(this.client, redisUser);

    return redisClient;
  }

  public async close() {
    if (this.client) {
      await this.client.quit();
    }
  }
}
