import * as dotenv from "dotenv";
import Fastify from "fastify";
import { bootstrap } from "fastify-decorators";
import runFixtures from "./datasource/fixture";

dotenv.config({ path: "../../.env" });

// ─── Init ──────────────────────────────────────────────────────────────── ✣ ─

const fastify = Fastify({ logger: true });

fastify.register(bootstrap, {
  directory: `${__dirname}/controllers`,
  mask: /\.controller\./,
});

// ─── Load Fixtures ─────────────────────────────────────────────────────── ✣ ─
// Refactor this
(async () => {
  try {
    await runFixtures();
    console.log("Fixtures loaded");
  } catch (err) {
    throw err;
  }
})();

// ─── Routes ────────────────────────────────────────────────────────────── ✣ ─

fastify.get("/", (_, reply) => {
  reply.send(":^)");
});

// ─── Server ────────────────────────────────────────────────────────────── ✣ ─

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;

  console.log(`Server listening on ${address}`);
});
