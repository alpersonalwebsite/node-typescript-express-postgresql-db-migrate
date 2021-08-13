# Node, TS, Express, PostgreSQL and migrations with db-migrate

**Under development**

## Overview

This is an easy, basic and raw example of HOW to implement ???

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
(... for dev and test)

```shell
createdb test_db
createdb test_db_test
```

### Migration

#### Run the first migration

```shell
db-migrate create migration-for-users-table --sql-file
```

#### Add the SQL statements
... to the newly created *.sql files.

migrations/sqls/20210811211022-migration-for-users-table-up.sql

```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50), age integer);
```

migrations/sqls/20210811211022-migration-for-users-table-down.sql

```sql
DROP TABLE users;
```

#### Run the migration

```shell
npm run migrate:up
```

This will run migrations for the `dev` environment.

If you want to do it in other environment, for example `test`, you need to have the stage and its configuration data in the `database.json` file and pass the proper flag.

Sample usage:

```shell
db-migrate up --env test 
```

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



<!--
To add...

If we need to alter the table, for example, we create a new migration

db-migrate create migration-for-alter-users-table-password_digest-column --sql-file


If we want to rollback or put down this migration
db-migrate down -c 1
-->
