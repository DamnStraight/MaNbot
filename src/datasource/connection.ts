import Database from "better-sqlite3";
import { SqliteConnection } from "ts-sql-query/connections/SqliteConnection";
import { BetterSqlite3QueryRunner } from "ts-sql-query/queryRunners/BetterSqlite3QueryRunner.js";
import { ConsoleLogQueryRunner } from "ts-sql-query/queryRunners/ConsoleLogQueryRunner.js";

class DBConnection extends SqliteConnection<"DBConnection"> {}

const DEBUG = process.env.NODE_ENV === "development";

const db = new Database("manbot.db");

function createConnection() {
  return DEBUG
    ? new DBConnection(
        new ConsoleLogQueryRunner(new BetterSqlite3QueryRunner(db))
      )
    : new DBConnection(new BetterSqlite3QueryRunner(db));
}

export { createConnection, DBConnection };
