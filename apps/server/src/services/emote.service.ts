import { Service } from "fastify-decorators";
import { createConnection } from "../datasource/connection";

@Service()
export default class EmoteService {
  async syncEmotes() {
    const connection = createConnection();

    connection.transaction(async () => {});
  }
}
