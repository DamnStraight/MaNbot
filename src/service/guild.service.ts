import { Message } from "discord.js";
import config from "../config/config";
import axios from "axios";

export async function addGuild(message: Message) {
  const mutationAddGuild = (guildId: string, name: string): string =>  `
      mutation {
        addGuild(guildId: \"${guildId}\", name: \"${name}\") {
          id
        }
      }
    `;

  const guildId: string = message.guild.id;
  const guildName: string = message.guild.name;

  const result = await axios.post(`${config.settings.app.url}/graphql`, {
      query: mutationAddGuild(guildId, guildName)
  });

  return result;
}