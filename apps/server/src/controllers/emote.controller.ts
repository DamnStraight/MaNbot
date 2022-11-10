import { Controller, GET, Inject } from "fastify-decorators";
import EmoteService from "../services/emote.service";

@Controller({ route: "/emote/" })
export default class EmoteController {
  @Inject(EmoteService)
  private emoteService!: EmoteService;

  @GET({ url: '/sync' })
  async syncEmotes() {
    await this.emoteService.syncEmotes();

    return "Synced"
  }
}
