import databaseFactory from '@src/factories/DatabaseClientFactory';
import { IDatabase, IUser, levels } from '@src/interfaces';
import TokenGenerator from '@src/services/TokenGenerator';
import Connections from '@src/services/Connections';
import { User } from '@src/classes/user';

describe('Tests for Database Factory', () => {
  let database: IDatabase<IUser, IUser>;

  const firstUser: IUser = new User({
    _id: TokenGenerator.generateToken(),
    name: 'TestName test',
    username: 'testUserName123',
    birthDate: new Date('05/27/1997'),
    email: 'testEmail@test.com',
    password: 'test',
    level: levels.admin,
    enable: true,
    lastChange: new Date('08/13/2022'),
  });

  const secondUser: IUser = new User({
    _id: TokenGenerator.generateToken(),
    name: 'Alan Roy',
    username: 'alan87ij',
    birthDate: new Date('03/20/1985'),
    email: 'alan2roy@hotmail.com',
    password: 'test',
    level: levels.standard,
    enable: true,
    lastChange: new Date('09/01/2022'),
  });

  beforeAll(async () => {
    await Connections.startDatabaseConnections();
    databaseFactory.start();
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

    let filteredResult = {};

    if (result) {
      filteredResult = new User(result);
    }

    expect(filteredResult).toEqual(firstUser);

    await database.deleteOne(firstUser._id);
  });

  it('should find all instances and return it with success', async () => {
    await database.create(firstUser);

    await database.create(secondUser);

    const result = await database.find({});

    const reShapedResult = result.map((user) => {
      return new User(user);
    });

    await database.deleteOne(firstUser._id);

    await database.deleteOne(secondUser._id);

    expect(reShapedResult).toEqual(
      expect.arrayContaining([firstUser, secondUser]),
    );
  });

  it('should find an instance by email address and return it with success', async () => {
    await database.create(firstUser);

    await database.create(secondUser);

    const result = await database.find({ email: firstUser.email });

    const reShapedResult = result.map((user) => {
      return new User(user);
    });

    await database.deleteOne(firstUser._id);

    await database.deleteOne(secondUser._id);

    expect(reShapedResult).toEqual([firstUser]);
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
