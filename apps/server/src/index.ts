import Fastify from "fastify";

// ─── Init ──────────────────────────────────────────────────────────────── ✣ ─

const fastify = Fastify({ logger: true });

// ─── Plugins ───────────────────────────────────────────────────────────── ✣ ─

fastify.register(require("./lib/ts-sql-query-plugin"), {});

// ─── Routes ────────────────────────────────────────────────────────────── ✣ ─

fastify.get("/", (_, reply) => {
  reply.send(":^)");
});

// ─── Server ────────────────────────────────────────────────────────────── ✣ ─

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;

  console.log(`Server listening on ${address}`);
});
