import { ElasticServer } from '@src/services';
import { Client } from 'elasticsearch';

class ElasticSearchFactory {
  public instance!: Client;
  public async start(): Promise<void> {
    const elasticServer = new ElasticServer();
    await elasticServer.start();
    this.instance = elasticServer.get();
  }

  public get(): Client {
    return this.instance;
  }
}

export default new ElasticSearchFactory();
