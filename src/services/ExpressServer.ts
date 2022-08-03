import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import routes from '../routes/index';

export class ExpressApp {
  private app = express();

  midddlewares() {
    const whitelist = ['https://localhost'];

    const corsOptions: cors.CorsOptions = {
      origin: whitelist,
    };

    const apiLimiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 120,
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      message: ReasonPhrases.TOO_MANY_REQUESTS,
    });

    this.app.use(cors(corsOptions));
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      if (req.header('authorization') === process.env.AUTHORIZATION_TOKEN) {
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).send({
          message: ReasonPhrases.UNAUTHORIZED,
        });
      }
    });

    this.app.use('/', apiLimiter);
  }

  routes() {
    this.app.use(routes);
  }

  async init() {
    this.midddlewares();
    this.routes();
    this.app.listen(process.env.PORT);
  }
}
