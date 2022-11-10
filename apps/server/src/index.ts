import Fastify from "fastify";
import { bootstrap } from "fastify-decorators";

// ─── Init ──────────────────────────────────────────────────────────────── ✣ ─

const fastify = Fastify({ logger: true });

fastify.register(bootstrap, {
  directory: __dirname + '/controllers',
  mask: /\.controller\./,
})

// ─── Routes ────────────────────────────────────────────────────────────── ✣ ─

fastify.get("/", (_, reply) => {
  reply.send(":^)");
});

// ─── Server ────────────────────────────────────────────────────────────── ✣ ─

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;

  console.log(`Server listening on ${address}`);
});
