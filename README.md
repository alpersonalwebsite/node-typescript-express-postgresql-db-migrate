# Node, TS, Express, PostgreSQL and database migrations with db-migrate

## Overview

This is an easy, basic and raw example of HOW to perform database migrations (or database schema migrations) with `db-migrate`

For more information about migrations [visit Prisma](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations)

## Requirements

- Node 12+
- NPM
- PostgreSQL
- db-migrate package as a global dependency

## Install dependencies

```shell
npm install
```

## DB

### Create databases 

```shell
createdb test_db
createdb test_db_test
```

### Migration

#### Create the first migration

```shell
db-migrate create migration-for-users-table --sql-file
```

#### Add the proper SQL statements
... to the newly created `*.sql` files.

To APPLY the migration (sample path: `migrations/sqls/20210811211022-migration-for-users-table-up.sql`)

```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50), age integer);
```

To REMOVE (rollback) the migration (sample path: `migrations/sqls/20210811211022-migration-for-users-table-down.sql`)

```sql
DROP TABLE users;
```

#### Run the migration

```shell
npm run migrate:up
```

This will run migrations for the `dev` environment (`db-migrate --env dev up`)

If you want to perform it in other environments, for example `test`, just add the stage and its configuration data to the `database.json` file and pass the proper flag.

Sample usage for stage:

```shell
db-migrate up --env test 
```

#### Notes

In this example, we have 3 migration files. 
When you run `npm run migrate:up` for the first time ALL (in this case 3) migrations will be applied. 
* [INFO] Processed migration 20210811211022-migration-for-users-table
* [INFO] Processed migration 20210813160817-migration-for-alter-users-table-password-digest-column
* [INFO] Processed migration 20210816172010-migration-for-alter-user-table-username-column

If you execute `npm run migrate:down` the latest migration will be rolled back, for our example:
* [INFO] Processed migration 20210816172010-migration-for-alter-user-table-username-column

In both cases, `up` and `down` you can set the number of migrations you want to execute:

```shell
db-migrate up -c 2

db-migrate down -c 2
```

If you want to tier down ALL migrations your can use the reset command:

```
db-migrate reset
```

For more information: https://db-migrate.readthedocs.io/en/latest/

## Running the server

### Development

```shell
npm run dev
```

### Production

```shell
npm run build

npm start
```

## Run unit tests

```shell
npm run test
```

## Linting

```shell
npm run lint
```

---

## Kudos

* Extended version of Udacity's JSFSN User Project