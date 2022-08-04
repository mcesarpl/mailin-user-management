import { ServerFactory } from '@src/factories';
import { LoggerFactory } from '@src/factories';
import { ElasticServer } from '.';

export class StartServer {
  constructor(private readonly log = new LoggerFactory().create()) {}

  public async start(): Promise<void> {
    try {
      const elasticsearch = new ElasticServer();
      await elasticsearch.init();

      const server = ServerFactory.create();
      await server.init();

      this.log.info(`Server is listening at port ${process.env.PORT}...`);
    } catch (error) {
      this.log.error((error as Error)?.message);
    }
  }
}
