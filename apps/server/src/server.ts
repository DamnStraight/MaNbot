import Fastify from "fastify";
import { bootstrap } from "fastify-decorators";
import runFixtures from "./datasource/fixture";

const startServer = async () => {
  // ─── Init ──────────────────────────────────────────────────────────────── ✣ ─

  const fastify = Fastify({ logger: true });

  fastify.register(bootstrap, {
    directory: `${__dirname}/controllers`,
    mask: /\.controller\./,
  });

  // ─── Load Fixtures ─────────────────────────────────────────────────────── ✣ ─
  try {
    await runFixtures();
    console.log("Fixtures loaded");
  } catch (err) {
    throw err;
  }

  // ─── Routes ────────────────────────────────────────────────────────────── ✣ ─

  fastify.get("/", (_, reply) => {
    reply.send(":^)");
  });

  // ─── Server ────────────────────────────────────────────────────────────── ✣ ─

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;

    console.log(`Server listening on ${address}`);
  });
};

export default startServer;
