import {
  Collection,
  CommandInteraction,
  GuildEmoji,
  SlashCommandBuilder,
} from "discord.js";
import { setTimeout as wait } from "timers/promises";
import { createConnection } from "../datasource/connection";
import { tEmote } from "../datasource/definitions";

// ─── Command Details ───────────────────────────────────────────────────── ✣ ─

const cacheEmoteCommand = new SlashCommandBuilder()
  .setName("cache")
  .setDescription("Snapshot current emotes into cache");

// ─── Command Execution ─────────────────────────────────────────────────── ✣ ─

/**
 * Downloads emote from given discord emoji URL
 * TODO Currently converting to base64 but should look into sqlite blobs
 *
 * @param url
 * @returns {string}
 */
async function downloadEmote(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

async function saveEmotes(
  emotes: Collection<string, GuildEmoji>,
  interaction: CommandInteraction
) {
  const connection = createConnection();
  let counter = 1;
  let totalEmotes = emotes.size;

  for (const [key, value] of emotes) {
    if (value.animated) continue;

    const base64Image = await downloadEmote(value.url);

    await connection
      .insertInto(tEmote)
      .values({
        name: value.name || key,
        discordId: key,
        image: base64Image,
      })
      .executeInsert();

    interaction.editReply(
      `${counter}/${totalEmotes}\nSaving <:${value.name}:${key}>`
    );
    counter++;

    await wait(2000);
  }
}

async function cacheEmoteExecution(interaction: CommandInteraction) {
  const emojiManager = interaction.guild?.emojis;

  await interaction.reply("Caching emotes...");

  if (emojiManager) {
    await saveEmotes(emojiManager.cache, interaction);
    await interaction.followUp("Done");
    return;
  } else {
    await interaction.editReply("Emote cache not set!");
  }
}

module.exports = {
  data: cacheEmoteCommand,
  execute: cacheEmoteExecution,
};
