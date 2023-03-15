import Connections from './Connections';
import config, { IConfig } from 'config';
import { ServerFactory } from '@src/factories';
import LoggerFactory from '@src/factories/LoggerFactory';
import databaseClientFactory from '@src/factories/DatabaseClientFactory';

export class StartServer {
  public static async start(): Promise<void> {
    try {
      const configPort: IConfig = config.get('App.port');

      await Connections.startDatabaseConnections();

      LoggerFactory.start();

      databaseClientFactory.start();

      const server = ServerFactory.create();
      await server.start();

      console.log(`Server is listening at port ${configPort}...`);
    } catch (error) {
      console.error((error as Error)?.stack);
    }
  }
}
