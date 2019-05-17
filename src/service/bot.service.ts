import { Message } from "discord.js";
import { addChannels } from "./channel.service";
import { generateEmoteDatabase } from "./emote.service";
import { addGuild } from "./guild.service";
import { generateUserDatabase } from "./user.service";

/**
 * Creates all necessary database entities and relationships on the server
 *
 * @param message
 */
export async function registerServer(message: Message) {
  await addGuild(message);
  await addChannels(message);
  await generateEmoteDatabase(message);
  await generateUserDatabase(message);
}
