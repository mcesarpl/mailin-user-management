import { RedisClient } from '../RedisClient';

import { createClient, RedisClientType } from 'redis';
import { IUser, levels } from '@src/interfaces';
import TokenGenerator from '../../services/TokenGenerator';

describe('Redis Client methods test', () => {
  const firstUser: IUser = {
    _id: TokenGenerator.generateToken(),
    name: 'Mathew',
    username: 'tuningMachine',
    birthDate: new Date('05/27/1997'),
    email: 'tuningMachine@hotmail.com',
    password: 'test',
    level: levels.admin,
    enable: true,
    lastChange: new Date('08/13/2022'),
  };

  const secondUser: IUser = {
    _id: TokenGenerator.generateToken(),
    name: 'Alan Roy',
    username: 'alan87ij',
    birthDate: new Date('03/20/1985'),
    email: 'alan2roy@hotmail.com',
    password: 'test',
    level: levels.standard,
    enable: true,
    lastChange: new Date('09/01/2022'),
  };

  const redisModel = {
    type: 'User',
    lookupParams: ['email'],
  };

  let client: RedisClientType;

  beforeAll(async () => {
    client = createClient({
      url: 'redis://localhost:6379',
    });

    await client.connect();
  });

  afterAll(async () => {
    await client.quit();
  });

  it('Should create a redis instance and return', async () => {
    const redisClient = new RedisClient(client, redisModel);

    const result = await redisClient.create(firstUser);

    await redisClient.deleteOne(firstUser._id);

    expect(result).toEqual(firstUser);
  });

  it('Should delete a redis instance and return', async () => {
    const redisClient = new RedisClient(client, redisModel);

    jest.spyOn(redisClient, 'deleteOne');

    await redisClient.create(firstUser);

    await redisClient.deleteOne(firstUser._id);

    expect(redisClient.deleteOne).toBeCalledTimes(1);
  });

  it('Should find one instance and return it', async () => {
    const redisClient = new RedisClient(client, redisModel);

    await redisClient.create(firstUser);

    const result = await redisClient.findOne(firstUser._id);

    const expectedResult = {
      ...firstUser,
      birthDate: firstUser.birthDate.toISOString(),
      lastChange: firstUser.lastChange.toISOString(),
    };

    await redisClient.deleteOne(firstUser._id);

    expect(result).toEqual(expectedResult);
  });

  it('Should find all instances of one type and return then', async () => {
    const redisClient = new RedisClient(client, redisModel);

    await redisClient.create(firstUser);

    await redisClient.create(secondUser);

    const result = await redisClient.find({});

    const firstExpectedInstance = {
      ...firstUser,
      birthDate: firstUser.birthDate.toISOString(),
      lastChange: firstUser.lastChange.toISOString(),
    };

    const secondExpectedInstance = {
      ...secondUser,
      birthDate: secondUser.birthDate.toISOString(),
      lastChange: secondUser.lastChange.toISOString(),
    };

    await redisClient.deleteOne(firstUser._id);

    await redisClient.deleteOne(secondUser._id);

    expect(result).toEqual(
      expect.arrayContaining([firstExpectedInstance, secondExpectedInstance]),
    );
  });

  it('Should find all instances with specific email', async () => {
    const redisClient = new RedisClient(client, redisModel);

    await redisClient.create(firstUser);

    await redisClient.create(secondUser);

    const firstExpectedInstance = {
      ...firstUser,
      birthDate: firstUser.birthDate.toISOString(),
      lastChange: firstUser.lastChange.toISOString(),
    };

    const result = await redisClient.find({ email: firstUser.email });

    await redisClient.deleteOne(firstUser._id);

    await redisClient.deleteOne(secondUser._id);

    expect(result).toEqual([firstExpectedInstance]);
  });

  it('Should update an instance with success', async () => {
    const redisClient = new RedisClient(client, redisModel);

    const modifiedUser = {
      ...firstUser,
      name: 'Jeron',
      user: 'jeron321',
      birthDate: new Date('05/27/2001'),
    };

    const result = await redisClient.updateOne(modifiedUser);

    await redisClient.deleteOne(modifiedUser._id);

    expect(result).toEqual(modifiedUser);
  });
});
