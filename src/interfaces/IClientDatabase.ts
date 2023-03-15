import { IDatabase } from './IDatabase';

export interface IClientDatabase {
  start(): IDatabase<unknown, unknown>;
  close(): Promise<void>;
}
