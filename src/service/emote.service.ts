import axios from "axios";
import { Guild, Message } from "discord.js";
import config from "../config/config";
import Emote from "../models/emote";
import { EmoteCountDto } from "../models/emoteCount";
import {
  containsEmote,
  EMOTE_REGEX_GLOBAL,
  extractEmote,
  processEmotes
} from "../util/emote.utils";

/**
 * Extracts all emotes from the guild the message originates from and populates the DB
 * @param message
 */
export async function generateEmoteDatabase(message: Message) {
  const mutationAddEmote = (guildId: string, emotes: Emote[]): string => {
    const data: string[] = emotes.map(
      emote => `{ id: \"${emote.id}\", name: \"${emote.name}\" }`
    );

    return `
      mutation {
        addEmotes(guildId: \"${guildId}\", data: [${data.toString()}]) {
          id
        }
      }
    `;
  };

  const guildEmotes: Array<Emote> = [];
  const guild: Guild = message.guild;
  const guildId = guild.id;

  guild.emojis.forEach(emote => {
    guildEmotes.push({ id: emote.id, name: emote.identifier } as Emote);
  });

  try {
    const result = await axios.post(`${config.settings.app.url}/graphql`, {
      query: mutationAddEmote(guildId, guildEmotes)
    });

    return result;
  } catch (err) {
    console.log("error");
  }
}

/**
 * Updates an emote usage count for a user
 * @param message
 */
export async function addToEmoteCount(message: Message) {
  const mutationSaveEmoteCount = (
    userId: string,
    emoteCounts: EmoteCountDto[]
  ) => {
    const data = emoteCounts.map(
      emoteCount =>
        `{ emoteId: \"${emoteCount.id}\", count: ${emoteCount.count} }`
    );

    return `
      mutation {
        saveEmoteCounts(userId: \"${userId}\", data: [${data.toString()}]) {
          count,
          emote {
            name
          }
        }
      }
    `;
  };

  const userId = message.author.id;
  const matches = message.content.match(EMOTE_REGEX_GLOBAL);
  const emoteCounts = processEmotes(matches);

  axios
    .post(`${config.settings.app.url}/graphql`, {
      query: mutationSaveEmoteCount(userId, emoteCounts)
    })
    .then(response => {
      console.log(":)");
    })
    .catch(err => {
      console.log(":(");
    });
}

/**
 * Gets a user's emote usage count for specified emote
 * @param message
 */
export async function showEmoteCount(message: Message) {
  const queryGetEmoteCount = (userId: string, emoteId: string) => `
    query {
      emoteCount(userId: \"${userId}\", emoteId: \"${emoteId}\") {
        count
      }
    }
  `;

  const messageArgs = message.content.split(" ");

  if (messageArgs.length != 2 || !containsEmote(messageArgs[1])) {
    message.channel.send(`${message.author.username} is an idiot`);
  }

  try {
    const result = await axios.post(`${config.settings.app.url}/graphql`, {
      query: queryGetEmoteCount(
        message.author.id,
        extractEmote(messageArgs[1])[1]
      )
    });

    const { data } = result.data;

    await message.channel.send(
      `You have used the emote ${messageArgs[1]} ${data.emoteCount.count} times`
    );
  } catch (err) {
    console.log(err);
  }
}
