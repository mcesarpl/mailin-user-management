import { IDatabase } from './IDatabase';

export interface IDatabaseFactory {
  start(): Promise<void>;
  close(): Promise<void>;
  get(): IDatabase<unknown, unknown>;
}
