export enum levels {
  'standard' = 'standard',
  'admin' = 'admin',
  'root' = 'root',
}

export interface IUser {
  _id: string;
  name: string;
  birthDate: Date;
  username: string;
  email: string;
  password: string;
  level: levels;
  enable: boolean;
  lastChange: Date;
}
