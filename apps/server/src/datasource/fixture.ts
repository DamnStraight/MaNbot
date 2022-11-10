import { createConnection } from "./connection";
import * as fs from "fs";

export default async function runFixtures() {
  const connection = createConnection();

  connection.beginTransaction();

  const fixture = fs.readFileSync("../../schema.sql", "utf8");

  try {
    await connection.queryRunner.executeDatabaseSchemaModification(fixture);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  }

  await connection.commit();
}
