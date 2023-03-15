import { MongoClient } from '@src/services';
import { connect as mongooseConnect, Model } from 'mongoose';
import userSchema from '@src/models/mongodb/user';
import { IUser, levels } from '@src/interfaces';
import TokenGenerator from '../../services/TokenGenerator';
import config, { IConfig } from 'config';

describe('Mongo Client Testes', () => {
  let model: Model<IUser>;
  let connection: typeof import('mongoose');
  let client: MongoClient<IUser>;
  const dbConfig: IConfig = config.get('App.database');

  const newUser: IUser = {
    _id: TokenGenerator.generateToken(),
    name: 'Test Name',
    username: 'testUserName',
    birthDate: new Date('05/27/1997'),
    email: 'test@gmail.com',
    password: 'test',
    level: levels.admin,
    enable: true,
    lastChange: new Date('08/13/2022'),
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
      username: 'anotherTestUserName',
      birthDate: new Date('10/01/1995'),
      email: 'anotherTest@gmail.com',
      password: 'test',
      level: levels.standard,
      enable: false,
      lastChange: new Date('08/15/1991'),
    };

    const responseUpdate = await client.updateOne(updateUser);

    await client.deleteOne(updateUser._id);

    expect(responseUpdate).toEqual(updateUser);
  });

  it('should find one instance by Id successfully', async () => {
    await client.create(newUser);

    const response = await client.findOne(newUser._id);

    await client.deleteOne(newUser._id);

    expect({ ...response, _id: response?._id.toString() }).toEqual({
      __v: 0,
      ...newUser,
    });
  });

  it('should find an instance by passed params', async () => {
    await client.create(newUser);

    const response = await client.find({ _id: newUser._id });

    await client.deleteOne(newUser._id);

    expect([{ ...response[0], _id: response[0]?._id.toString() }]).toEqual([
      {
        __v: 0,
        ...newUser,
      },
    ]);
  });
});
