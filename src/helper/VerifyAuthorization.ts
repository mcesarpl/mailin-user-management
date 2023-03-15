import { Request, Response, NextFunction } from 'express';
import JwtGenerator from '@src/services/JwtGenerator';
import databaseClientFactory from '@src/factories/DatabaseClientFactory';

export class VerifyAuthorization {
  constructor(private readonly database = databaseClientFactory.get()) {}

  async isAccountOwner(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

    const userId = JwtGenerator.retrieve(String(token));

    if (!userId) {
      return res.status(401).send();
    }

    const validId = req.body?._id ? req.body._id : req.params?._id;

    if (!validId || validId !== userId) {
      const user = await this.database.findOne(userId);

      if (!user || user.level !== 'root') {
        return res.status(401).send();
      }
    }

    return next();
  }

  async isRoot(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

    const userId = JwtGenerator.retrieve(String(token));

    if (!userId) {
      return res.status(401).send();
    }

    const user = await this.database.findOne(userId);

    if (!user || user.level !== 'root') {
      return res.status(401).send();
    }

    return next();
  }
}
