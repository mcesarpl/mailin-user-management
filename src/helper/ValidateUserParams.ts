import { IUser } from '@src/interfaces';
import { utils } from './utils';
import databaseClientFactory from '@src/factories/DatabaseClientFactory';

export class ValidateUserParams {
  constructor(private readonly database = databaseClientFactory.get()) {}
  public async validateUpdateParams(
    userParams: Partial<IUser> & { _id: string },
  ): Promise<boolean> {
    const { username, email, password } = userParams;

    if (password) {
      if (this.validPassWord(password)) {
        return false;
      }
    }

    if (email) {
      if (!(await this.validUserEmail(userParams))) {
        return false;
      }
    }

    if (username) {
      if (!(await this.validUsername(userParams))) {
        return false;
      }
    }

    return true;
  }

  public async validateUserParams(user: IUser): Promise<boolean> {
    const { password } = user;

    if (!this.validPassWord(password)) {
      return false;
    }

    if (!(await this.validUsername(user))) {
      return false;
    }

    if (!(await this.validUserEmail(user))) {
      return false;
    }

    return true;
  }

  public validPassWord(newPassWord: string | undefined): boolean {
    if (!newPassWord) {
      return false;
    }

    if (!utils.isLongEnough(newPassWord)) {
      return false;
    }

    if (!utils.containsNumber(newPassWord)) {
      return false;
    }

    return true;
  }

  public async validUsername(
    inputUserParams: Partial<IUser> & { _id: string },
  ): Promise<boolean> {
    const newUsername = inputUserParams?.username;

    if (!newUsername) {
      return false;
    }

    if (!utils.isLongEnough(newUsername, 3)) {
      return false;
    }

    if (utils.containsSpecialCharacters(newUsername)) {
      return false;
    }

    if (await this.findOneUserWithUsername(newUsername)) {
      return false;
    }

    return true;
  }

  public async validUserEmail(
    inputUserParams: Partial<IUser> & { _id: string },
  ): Promise<boolean> {
    const newEmail = inputUserParams?.email;

    if (!newEmail) {
      return false;
    }

    if (!utils.isThisEmailValid(newEmail)) {
      return false;
    }

    if (await this.findOneUserWithEmail(newEmail)) {
      return false;
    }

    return true;
  }

  public validUserId(userId: string): boolean {
    if (!userId || typeof userId !== 'string' || userId.length === 0) {
      return false;
    }
    return true;
  }

  public async findOneUserWithUsername(username: string): Promise<boolean> {
    return !!(await this.database.find({ username: username })).length;
  }

  public async findOneUserWithEmail(email: string): Promise<boolean> {
    return !!(await this.database.find({ username: email })).length;
  }
}
