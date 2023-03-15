import { IDatabase } from '@src/interfaces/IDatabase';
import { Model } from 'mongoose';

export class MongoClient<T> implements IDatabase<T, T | null> {
  constructor(private model: Model<T>) {}

  async create(instance: T & { _id: string }) {
    await this.model.create<T>(instance);
    return instance;
  }

  async updateOne(instance: T & { _id: string }) {
    await this.model.updateOne<T>({ _id: instance._id }, { ...instance });
    return instance;
  }

  async findOne(instanceId: string) {
    const instance = await this.model
      .findOne<T>({
        _id: instanceId,
      })
      .lean();

    if (!instance) {
      return null;
    }

    return instance as T;
  }

  async find(params: object): Promise<T[]> {
    return await this.model.find<T>({ ...params }).lean();
  }

  async deleteOne(instanceId: string) {
    await this.model.deleteOne({ _id: instanceId });
  }
}
