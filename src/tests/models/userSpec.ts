import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an getAll method', () => {
    expect(store.getAll).toBeDefined();
  });

  it('should have a getOne method', () => {
    expect(store.getOne).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a remove method', () => {
    expect(store.remove).toBeDefined();
  });

  it('create method should adds a user', async () => {
    const result = await store.create({
      name: 'Peter',
      age: 33,
      username: 'ppeter',
      password: '1234'
    });
    expect(result).toEqual({
      id: 1,
      name: 'Peter',
      age: 33,
      password_digest: 'this_should_be_a_hashed_password',
      username: 'ppeter'
    });
  });

  it('getAll method should return a list of users', async () => {
    const result = await store.getAll();
    expect(result).toEqual([
      {
        id: 1,
        name: 'Peter',
        age: 33,
        password_digest: 'this_should_be_a_hashed_password',
        username: 'ppeter'
      }
    ]);
  });

  it('getOne method should return the correct user', async () => {
    const result = await store.getOne('1');
    expect(result).toEqual({
      id: 1,
      name: 'Peter',
      age: 33,
      password_digest: 'this_should_be_a_hashed_password',
      username: 'ppeter'
    });
  });

  it('remove method should remove the user', async () => {
    const _removeUser = await store.remove('1');
    const result = await store.getAll();
    expect(result).toEqual([]);
  });
});
