import { Pool } from "pg";
import { PostgreSqlConnection } from "ts-sql-query/connections/PostgreSqlConnection.js";
import { ConsoleLogQueryRunner } from "ts-sql-query/queryRunners/ConsoleLogQueryRunner.js";
import { PgPoolQueryRunner } from "ts-sql-query/queryRunners/PgPoolQueryRunner.js";

class DBConnection extends PostgreSqlConnection<"DBConnection"> {}

const DEBUG = process.env.NODE_ENV === "development";

// NOTE Uses the PG* values from the env variables
const pool = new Pool();

function createConnection() {
  return DEBUG
    ? new DBConnection(new ConsoleLogQueryRunner(new PgPoolQueryRunner(pool)))
    : new DBConnection(new PgPoolQueryRunner(pool));
}

export { createConnection, DBConnection };
