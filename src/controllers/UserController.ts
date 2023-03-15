import { Request, Response } from 'express';
import { User } from '@src/classes/user';
import { IDatabase } from '@src/interfaces';
import LoggerFactory from '@src/factories/LoggerFactory';
import databaseClientFactory from '@src/factories/DatabaseClientFactory';
import { ValidateUserParams } from '@src/helper/ValidateUserParams';
import Hash from '@src/services/Hash';

export class UserController {
  private database: IDatabase<unknown, unknown>;
  private validator: ValidateUserParams;

  constructor(private readonly log = LoggerFactory.get()) {
    this.database = databaseClientFactory.get();
    this.validator = new ValidateUserParams();
  }
  async create(request: Request, response: Response) {
    try {
      const user = new User(request.body);

      const isValid = await this.validator.validateUserParams(user);

      if (!isValid) {
        return response.status(400).send();
      }

      const updatedUser = {
        ...user,
        password: await Hash.hash(user.password),
      };

      await this.database.create(updatedUser);

      this.log.info(`New User added: ${user._id}`);

      return response.status(200).json(user);
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }

  async find(request: Request, response: Response) {
    try {
      const query = request.query;

      const result = await this.database.find(query);

      return response.status(200).json(result);
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const { _id } = request.params;

      const isValid = this.validator.validUserId(_id);

      if (!isValid) {
        return response.status(400).send();
      }

      const result = await this.database.findOne(_id);

      return response.status(200).json(result);
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }

  async update(request: Request, response: Response) {
    try {
      const updateBody = request.body;

      const isValid = await this.validator.validateUpdateParams(updateBody);

      if (!updateBody?._id || !isValid) {
        return response.status(400).send();
      }

      await this.database.updateOne(updateBody);

      this.log.info(`User updated: ${updateBody._id}`);

      return response.status(200).send();
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { _id } = request.params;

      const isValid = this.validator.validUserId(_id);

      if (!isValid) {
        return response.status(400).send();
      }

      await this.database.deleteOne(_id);

      this.log.info(`User deleted: ${_id}`);

      return response.status(200).send();
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }

  async softDelete(request: Request, response: Response) {
    try {
      const { _id } = request.params;

      const isValid = this.validator.validUserId(_id);

      if (!isValid) {
        return response.status(400).send();
      }

      await this.database.updateOne({ _id, enable: false });

      this.log.info(`User soft deleted: ${_id}`);

      return response.status(200).send();
    } catch (error) {
      this.log.error((error as Error).stack);
      return response.status(501).send();
    }
  }
}
