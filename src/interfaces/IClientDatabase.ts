import { IDatabase } from './IDatabase';

export interface IClientDatabase {
  start(): Promise<IDatabase<unknown, unknown>>;
  close(): Promise<void>;
}
