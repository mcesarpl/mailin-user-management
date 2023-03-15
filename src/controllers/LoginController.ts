import { Request, Response } from 'express';
import LoggerFactory from '@src/factories/LoggerFactory';
import databaseClientFactory from '@src/factories/DatabaseClientFactory';
import Hash from '@src/services/Hash';
import JwtGenerator from '@src/services/JwtGenerator';
import { IUser } from '@src/interfaces';

export class LoginController {
  constructor(
    private readonly log = LoggerFactory.get(),
    private readonly database = databaseClientFactory.get(),
  ) {}

  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      if (!username || !password) {
        return response.status(400).send();
      }

      const users = await this.database.find({ username });

      if (users?.length < 1) {
        return response.status(400).send();
      }

      const foundUser: IUser = users[0];

      const userPassword = foundUser.password;

      if (!(await Hash.verify(userPassword, password))) {
        return response.status(400).send();
      }

      const token = JwtGenerator.generate(foundUser._id);

      this.log.info(`User ${foundUser._id} has logged in`);

      return response.status(200).json({ auth: true, token: token });
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }

  async logout(_: Request, response: Response) {
    try {
      return response.status(200).json({ auth: true, token: null });
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }
}
