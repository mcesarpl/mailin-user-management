import { IClientDatabase } from '@src/interfaces';
import userSchema from '@src/models/mongodb/user';
import { MongoClient } from '@src/adapters/MongoClient';
import { IUser } from '@src/interfaces';
import Connections from '@src/services/Connections';
import { Model } from 'mongoose';

export class MongoClientAdapter implements IClientDatabase {
  client!: typeof import('mongoose');

  public start() {
    this.client = Connections.getConnections().mongo;

    const model: Model<IUser> = this.client.model<IUser>('User', userSchema);

    return new MongoClient<IUser>(model);
  }

  public async close() {
    if (this.client) {
      await this.client.disconnect();
    }
  }
}
