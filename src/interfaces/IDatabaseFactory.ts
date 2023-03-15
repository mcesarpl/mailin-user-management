import { IDatabase } from './IDatabase';

export interface IDatabaseFactory {
  start(): void;
  close(): Promise<void>;
  get(): IDatabase<unknown, unknown>;
}
