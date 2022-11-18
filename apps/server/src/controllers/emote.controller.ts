import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, Inject } from "fastify-decorators";
import { Readable } from "stream";
import EmoteService from "../services/emote.service";

@Controller({ route: "/emote/" })
export default class EmoteController {
  @Inject(EmoteService)
  private emoteService!: EmoteService;

  @GET({ url: "/" })
  async fetchEmotes(_: FastifyRequest, reply: FastifyReply) {
    const result = await this.emoteService.getEmotes();

    await reply
      .header("Access-Control-Allow-Origin", "*")
      .code(200)
      .send(result);
  }

  @GET({ url: "/:name" })
  async emote(
    request: FastifyRequest<{ Params: { name: string } }>,
    reply: FastifyReply
  ) {
    const { name } = request.params;

    const maybeImage = await this.emoteService.getEmote(name);

    if (maybeImage?.image === undefined) {
      return await reply.code(404).send({});
    }

    const stream = new Readable({
      read() {
        this.push(Buffer.from(maybeImage?.image!, "base64"));
        this.push(null);
      },
    });

    reply.type("image/png");
    await reply.code(200).send(stream);
  }
}
