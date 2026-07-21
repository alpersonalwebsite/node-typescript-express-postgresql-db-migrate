import client from '../database';

export type User = {
  id?: number;
  password_digest?: string;
  username: string;
  name: string;
  age: number;
};

export type CreateUser = User & {
  password: string;
  username: string;
};

// this class is going to be the representation of the database that why we include the word store
export class UserStore {
  // Get a list of all the items in database
  async getAll(): Promise<User[]> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users, ${err}`);
    } finally {
      conn.release();
    }
  }
  async getOne(id: string): Promise<User> {
    const conn = await client.connect();
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get that user, ${err}`);
    } finally {
      conn.release();
    }
  }
  async create(u: CreateUser): Promise<User> {
    const conn = await client.connect();
    try {
      const hash = 'this_should_be_a_hashed_password';

      const sql =
        'INSERT INTO users (name, age, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [u.name, u.age, u.username, hash]);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create that user, ${err}`);
    } finally {
      conn.release();
    }
  }
  async remove(id: string): Promise<User | never> {
    const conn = await client.connect();
    try {
      const sqlSelect = 'SELECT * FROM users WHERE id=($1)';
      const resultSelect = await conn.query(sqlSelect, [id]);

      if (!resultSelect.rows[0]) {
        throw `User doesn't exist`;
      }

      const sqlDelete = 'DELETE FROM users WHERE id=($1)';
      await conn.query(sqlDelete, [id]);

      return resultSelect.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete that user. ${err}`);
    } finally {
      conn.release();
    }
  }
}
