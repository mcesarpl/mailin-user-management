import { Request, Response, NextFunction } from 'express';
import JwtGenerator from '@src/services/JwtGenerator';

class VerifyAuthentication {
  verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

    if (!token || !JwtGenerator.verify(String(token))) {
      return res.status(401).send();
    }

    return next();
  }
}

export default new VerifyAuthentication();
