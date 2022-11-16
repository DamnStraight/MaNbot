import { Service } from "fastify-decorators";
import { createConnection } from "../datasource/connection";
import { tEmote, tEmoteVariant, tVariant } from "../datasource/definitions";

@Service()
export default class EmoteService {
  async syncEmotes() {
    const connection = createConnection();

    return connection.transaction(async () => {
      return await connection
        .selectFrom(tEmote)
        .innerJoin(tEmoteVariant)
        .on(tEmoteVariant.emoteId.equals(tEmote.id))
        .innerJoin(tVariant)
        .on(tVariant.id.equals(tEmoteVariant.emoteId))
        .select({
          name: tEmote.name,
        })
        .executeSelectMany();
    });
  }

  async getEmote(imageName: string) {
    const connection = createConnection();

    return connection.transaction(async () => {
      return await connection
        .selectFrom(tEmote)
        .select({
          image: tEmote.image,
        })
        .where(tEmote.name.equalsInsensitive(imageName))
        .executeSelectNoneOrOne();
    });
  }
}
