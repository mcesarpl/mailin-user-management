import { IClientDatabase } from '@src/interfaces';
import { userSchema } from '@src/models/mongodb/user';
import { MongoClient } from '@src/services/MongoClient';
import { IUser } from '@src/interfaces';
import Connections from '@src/services/Connections';
import { Document, Model } from 'mongoose';

class MongoClientFactory implements IClientDatabase {
  client!: typeof import('mongoose');

  public async start() {
    this.client = Connections.getConnections().mongo;

    const model: Model<IUser | Document> = this.client.model<IUser | Document>(
      'User',
      userSchema,
    );

    const mongoClient = new MongoClient<IUser | Document>(model);

    return mongoClient;
  }

  public async close() {
    if (this.client) {
      await this.client.disconnect();
    }
  }
}

export default MongoClientFactory;
