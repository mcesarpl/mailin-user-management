import { IUser, levels } from '@src/interfaces';
import TokenGenerator from '@src/services/TokenGenerator';

export class User implements IUser {
  _id: string;
  name: string;
  birthDate: Date;
  username: string;
  email: string;
  password: string;
  level: levels;
  enable: boolean;
  lastChange: Date;

  constructor(instance: IUser) {
    this._id = instance._id
      ? String(instance._id)
      : TokenGenerator.generateToken();
    this.name = instance.name;
    this.birthDate = new Date(instance.birthDate);
    this.username = instance.username;
    this.email = instance.email;
    this.password = instance.password;
    this.level = levels[`${instance.level}`];
    this.enable = instance.enable;
    this.lastChange = instance.lastChange
      ? new Date(instance.lastChange)
      : new Date();
  }
}
