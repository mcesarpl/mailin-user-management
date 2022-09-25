export interface IDatabase<I, T> {
  create(instance: I): Promise<T>;
  updateOne(instance: I): Promise<T>;
  findOne(instanceId: string): Promise<T | null>;
  find(param: object): Promise<T[]>;
  deleteOne(instanceId: string): Promise<void>;
}
