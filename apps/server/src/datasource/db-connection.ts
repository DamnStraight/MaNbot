import { Pool } from "pg";
import { PostgreSqlConnection } from "ts-sql-query/connections/PostgreSqlConnection";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner";

class DBConnection extends PostgreSqlConnection<"DBConnection"> {}

export type DatabaseConnection = DBConnection;

// NOTE Uses the PG* values from the env variables
const pool = new Pool();

export const createConnection = () =>
  new DBConnection(new PgPoolQueryRunner(pool));
