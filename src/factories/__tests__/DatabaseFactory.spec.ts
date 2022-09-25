import databaseFactory from '@src/factories/DatabaseFactory';
import { IDatabase, IUser, levels } from '@src/interfaces';
import TokenGenerator from '@src/services/TokenGenerator';
import Connections from '@src/services/Connections';

describe('Tests for Database Factory', () => {
  let database: IDatabase<unknown, unknown>;

  const firstUser: IUser = {
    _id: TokenGenerator.generateToken(),
    name: 'TestName test',
    user: 'testUserName123',
    birthDate: new Date('05/27/1997'),
    email: 'testEmail@test.com',
    password: 'test',
    level: levels.admin,
    enable: true,
    lastChange: new Date('08/13/2022'),
  };

  const secondUser: IUser = {
    _id: TokenGenerator.generateToken(),
    name: 'Alan Roy',
    user: 'alan87ij',
    birthDate: new Date('03/20/1985'),
    email: 'alan2roy@hotmail.com',
    password: 'test',
    level: levels.standard,
    enable: true,
    lastChange: new Date('09/01/2022'),
  };

  beforeAll(async () => {
    await Connections.startDatabaseConnections();
    await databaseFactory.start();
    database = databaseFactory.get();
  });

  afterAll(async () => {
    await databaseFactory.close();
  });

  it('should create an instance and than delete it with success', async () => {
    const result = await database.create(firstUser);

    jest.spyOn(database, 'deleteOne');

    expect(result).toEqual(firstUser);

    await database.deleteOne(firstUser._id);

    expect(database.deleteOne).toBeCalledTimes(1);
  });

  it('should find one instance and return it with success', async () => {
    await database.create(firstUser);

    const result = await database.findOne(firstUser._id);

    const expectedResult = {
      ...firstUser,
      birthDate: firstUser.birthDate.toISOString(),
      lastChange: firstUser.lastChange.toISOString(),
    };

    expect(result).toEqual(expectedResult);

    await database.deleteOne(firstUser._id);
  });

  it('should find all instances and return it with success', async () => {
    await database.create(firstUser);

    await database.create(secondUser);

    const result = await database.find({});

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

    expect(result).toEqual(
      expect.arrayContaining([firstExpectedInstance, secondExpectedInstance]),
    );

    await database.deleteOne(firstUser._id);

    await database.deleteOne(secondUser._id);
  });

  it('should find an instance by email address and return it with success', async () => {
    await database.create(firstUser);

    await database.create(secondUser);

    const result = await database.find({ email: firstUser.email });

    const firstExpectedInstance = {
      ...firstUser,
      birthDate: firstUser.birthDate.toISOString(),
      lastChange: firstUser.lastChange.toISOString(),
    };

    expect(result).toEqual([firstExpectedInstance]);

    await database.deleteOne(firstUser._id);

    await database.deleteOne(secondUser._id);
  });

  it('should update one instance with success', async () => {
    await database.create(firstUser);

    const modifiedUser = {
      ...firstUser,
      name: 'modified name',
    };

    const result = await database.updateOne(modifiedUser);

    expect(result).toEqual(modifiedUser);

    await database.deleteOne(firstUser._id);
  });
});
