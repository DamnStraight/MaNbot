import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { createConnection, DatabaseConnection } from "../datasource/db-connection";

async function fastifyDatabase(
  fastify: FastifyInstance & { database?: DatabaseConnection }
) {
  fastify.decorate<DatabaseConnection | undefined>("database", undefined);

  fastify.addHook("onRequest", async () => {
    fastify.database = createConnection();
  });
}

export default fastifyPlugin(fastifyDatabase, { name: "ts-sql-query" });
