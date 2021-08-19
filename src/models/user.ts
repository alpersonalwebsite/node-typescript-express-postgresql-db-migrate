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
    try {
      // open connection to database
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);

      // close or release database connection
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users, ${err}`);
    }
  }
  async getOne(id: string): Promise<User> {
    try {
      // open connection to database
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);

      // close or release database connection
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get that user, ${err}`);
    }
  }
  async create(u: CreateUser): Promise<User> {
    try {
      // open connection to database
      const conn = await client.connect();

      const hash = 'this_should_be_a_hashed_password';

      const sql =
        'INSERT INTO users (name, age, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [u.name, u.age, u.username, hash]);

      // close or release database connection
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create that user, ${err}`);
    }
  }
  async remove(id: string): Promise<User | never> {
    try {
      // open connection to database
      const conn = await client.connect();

      const sqlSelect = 'SELECT * FROM users WHERE id=($1)';
      const resultSelect = await conn.query(sqlSelect, [id]);

      if (!resultSelect.rows[0]) {
        throw `User doesn't exist`;
      }

      const sqlDelete = 'DELETE FROM users WHERE id=($1)';
      const resultDelete = await conn.query(sqlDelete, [id]);

      // close or release database connection
      conn.release();

      return resultSelect.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete that user. ${err}`);
    }
  }
}
