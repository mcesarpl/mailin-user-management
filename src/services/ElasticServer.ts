import { LoggerFactory } from '@src/factories';
import elasticsearch from 'elasticsearch';
import winston from 'winston';

export class ElasticServer {
  private readonly client: elasticsearch.Client;
  private readonly log: winston.Logger;

  constructor() {
    this.client = new elasticsearch.Client({
      host: process.env.ELASTIC_SERVER,
      log: 'trace',
    });

    this.log = new LoggerFactory().create();
  }

  async ping() {
    try {
      await this.client.ping({
        requestTimeout: 1000,
      });
    } catch (error) {
      this.log.error((error as Error).message);
    }
  }

  async init() {
    await this.ping();
  }
}
