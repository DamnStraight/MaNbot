import { Service } from "fastify-decorators";
import { createConnection } from "../datasource/connection";
import { tEmote } from "../datasource/definitions";

@Service()
export default class EmoteService {
  async getEmotes() {
    const connection = createConnection();

    const result = await connection.transaction(async () => {
      return await connection
        .selectFrom(tEmote)
        .select({
          name: tEmote.name,
        })
        .executeSelectMany();
    });

    return result.map(({ name }) => ({
      name,
      // TODO Move this to a URL env variable
      url: `http://127.0.0.1:3001/emote/${name}`,
    }));
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
