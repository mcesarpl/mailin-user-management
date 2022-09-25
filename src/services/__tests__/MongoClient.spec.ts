import { MongoClient } from '@src/services';
import { connect as mongooseConnect, Model } from 'mongoose';
import { userSchema } from '@src/models/mongodb/user';
import { IUser, levels } from '@src/interfaces';
import TokenGenerator from '../TokenGenerator';
import config, { IConfig } from 'config';

describe('Mongo Client Testes', () => {
  let model: Model<IUser>;
  let connection: typeof import('mongoose');
  let client: MongoClient<IUser>;
  const dbConfig: IConfig = config.get('App.database');

  const newUser: IUser = {
    _id: TokenGenerator.generateToken(),
    name: 'Test Name',
    user: 'testUserName',
    birthDate: new Date('05/27/1997'),
    email: 'test@gmail.com',
    password: 'test',
    level: levels.admin,
    enable: true,
    lastChange: new Date('08/13/2022'),
  };

  const expectedUser = {
    ...newUser,
    birthDate: newUser.birthDate.toISOString(),
    lastChange: newUser.lastChange.toISOString(),
  };

  beforeAll(async () => {
    connection = await mongooseConnect(dbConfig.get('mongo'));

    model = connection.model<IUser>('User', userSchema);

    client = new MongoClient<IUser>(model);
  });

  afterAll(async () => {
    await connection?.disconnect();
  });

  it('should create and delete an user with success', async () => {
    jest.spyOn(client, 'deleteOne');

    const response = await client.create(newUser);

    expect(response).toEqual(newUser);

    await client.deleteOne(newUser._id);

    expect(client.deleteOne).toBeCalledTimes(1);
  });

  it('should update an instance successfully', async () => {
    await client.create(newUser);

    const updateUser: IUser = {
      ...newUser,
      name: 'Another Test',
      user: 'anotherTestUserName',
      birthDate: new Date('10/01/1995'),
      email: 'anotherTest@gmail.com',
      password: 'test',
      level: levels.standard,
      enable: false,
      lastChange: new Date('08/15/1991'),
    };

    const responseUpdate = await client.updateOne(updateUser);

    expect(responseUpdate).toEqual(updateUser);

    await client.deleteOne(updateUser._id);
  });

  it('should find one instance by Id successfully', async () => {
    await client.create(newUser);

    const response = await client.findOne(newUser._id);

    expect(response).toEqual(expectedUser);

    await client.deleteOne(newUser._id);
  });

  it('should find an instance by passed params', async () => {
    await client.create(newUser);

    const response = await client.find({ _id: newUser._id });

    expect(response).toEqual([expectedUser]);

    await client.deleteOne(newUser._id);
  });
});
