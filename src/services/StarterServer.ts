import { ServerFactory } from '@src/factories';
import { LoggerFactory } from '@src/factories';
import { ElasticServer } from '.';
import config, { IConfig } from 'config';
import Connections from './Connections';

export class StartServer {
  constructor(private readonly log = new LoggerFactory().create()) {}

  public async start(): Promise<void> {
    try {
      const configPort: IConfig = config.get('App.port');

      const elasticsearch = new ElasticServer();
      await elasticsearch.init();

      const server = ServerFactory.create();
      await server.init();

      await Connections.startDatabaseConnections();

      this.log.info(`Server is listening at port ${configPort}...`);
    } catch (error) {
      this.log.error((error as Error)?.stack);
    }
  }
}
