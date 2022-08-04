import { createLogger, format, transports } from 'winston';
import {
  ElasticsearchTransport,
  ElasticsearchTransformer,
  LogData,
} from 'winston-elasticsearch';
import moment from 'moment';

export class Logger {
  create() {
    const { combine, colorize, printf } = format;

    const { Console } = transports;

    const myFormat = printf(({ level, message }) => {
      return `${moment()
        .format('YYYY-MM-DD HH:mm:ss')
        .trim()} [${level}] - ${message}`;
    });

    const wintstonLogger = createLogger({
      level: 'info',
    });

    const errorStackFormat = format((info) => {
      if (info.stack) {
        return false;
      }
      return info;
    });

    const consoleTransport = new Console({
      format: combine(colorize(), errorStackFormat(), myFormat),
    });

    const esTransportOpts = {
      level: 'error',
      transformer: (logData: LogData) => {
        const transformed = ElasticsearchTransformer(logData);
        return transformed;
      },
      clientOpts: { node: process.env.ELASTIC_SERVER },
    };

    const esTransport = new ElasticsearchTransport(esTransportOpts);

    wintstonLogger.add(consoleTransport);
    wintstonLogger.add(esTransport);

    return wintstonLogger;
  }
}
