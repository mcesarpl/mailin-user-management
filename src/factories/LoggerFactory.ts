import { Logger } from '@src/services';
import winston from 'winston';

export class LoggerFactory {
  create(): winston.Logger {
    return new Logger().create();
  }
}
