import { Message } from "discord.js";
import axios from "axios";
import config from "../config/config";
import Channel from "../models/channel";

export async function addChannels(message: Message) {
  const mutationAddChannels = (guildId: string, channels: Channel[]) => {
    const data: string[] = channels.map(
      channel => `{ channelId: \"${channel.channelId}\", name: \"${channel.name}\" }, `
    );

    return `
      mutation {
        addChannels(guildId: \"${guildId}\", channels: [${data}]) {
          id
        }
      }
    `;
  };

  const guildId = message.guild.id;

  const channels = message.guild.channels.map(channel => {
    return {
      channelId: channel.id,
      name: channel.name
    } as Channel;
  });

  const result = await axios
    .post(`${config.settings.app.url}/graphql`, {
      query: mutationAddChannels(guildId, channels)
  });

  return result;
}