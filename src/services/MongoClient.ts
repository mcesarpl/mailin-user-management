import { IDatabase } from '@src/interfaces/IDatabase';
import {
  Model,
  Document,
  ObjectId,
  HydratedDocument,
  LeanDocument,
} from 'mongoose';

export class MongoClient<T>
  implements
    IDatabase<
      T,
      | (Document & { _id: ObjectId })
      | HydratedDocument<T, unknown, unknown>
      | LeanDocument<HydratedDocument<T, unknown, unknown>>
      | T
    >
{
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
    const instance = await this.model.findOne({ _id: instanceId });
    if (!instance) {
      return null;
    }
    return instance.toObject();
  }

  async find(params: object) {
    const result = await this.model.find({ ...params });

    const final = result.map((instance) => {
      return instance.toObject();
    });

    return final;
  }

  async deleteOne(instanceId: string) {
    await this.model.deleteOne({ _id: instanceId });
  }
}
