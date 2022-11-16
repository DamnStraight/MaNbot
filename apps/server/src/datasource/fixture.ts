import { createConnection } from "./connection";
import { tEmote, tEmoteVariant, tVariant } from "./definitions";

export default async function runFixtures() {
  const connection = createConnection();
  connection.beginTransaction();

  try {
    if (process.env.DROP_SCHEMA === "true") {
      await connection.queryRunner.executeDatabaseSchemaModification(
        "drop table if exists emote_variant"
      );
      await connection.queryRunner.executeDatabaseSchemaModification(
        "drop table if exists emote"
      );
      await connection.queryRunner.executeDatabaseSchemaModification(
        "drop table if exists variant"
      );

      await connection.queryRunner.executeDatabaseSchemaModification(`
      CREATE TABLE emote (
        id integer PRIMARY KEY AUTOINCREMENT,
        name varchar(30) NOT NULL,
        discord_id varchar(30) NOT NULL,
        image text NOT NULL
      )
    `);

      await connection.queryRunner.executeDatabaseSchemaModification(`
      CREATE TABLE variant (
        id integer  PRIMARY KEY AUTOINCREMENT,
        name varchar(30) NOT NULL
      )
    `);

      await connection.queryRunner.executeDatabaseSchemaModification(`
      CREATE TABLE emote_variant (
        emote_id integer REFERENCES emote (id) ON UPDATE CASCADE ON DELETE CASCADE,
        variant_id integer REFERENCES variant (id) ON UPDATE CASCADE ON DELETE CASCADE,
        image text NOT NULL
      )
    `);

      await connection
        .insertInto(tEmote)
        .values({
          name: "emoneySwag",
          discordId: "172522267144437777",
          image: "test",
        })
        .executeInsert();

      await connection
        .insertInto(tVariant)
        .values({
          name: "Christmas",
        })
        .executeInsert();

      await connection
        .insertInto(tEmoteVariant)
        .values({
          emoteId: 1,
          variantId: 1,
          image: "test2",
        })
        .executeInsert();
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}
