import { CommandInteraction, SlashCommandBuilder } from "discord.js";

// ─── Command Details ───────────────────────────────────────────────────── ✣ ─

const cacheEmoteCommand = new SlashCommandBuilder()
  .setName("cache")
  .setDescription("Snapshot current emotes into");

// ─── Command Execution ─────────────────────────────────────────────────── ✣ ─

async function cacheEmoteExecution(interaction: CommandInteraction) {
  const emojiManager = interaction.guild?.emojis;

  if (emojiManager) {
    let allEmotes = "";
    allEmotes = emojiManager?.cache.map((val, _) => `${val.name},`).join("");

    console.log(allEmotes);
  }

  await interaction.reply("Placeholder text here");
}

module.exports = {
  data: cacheEmoteCommand,
  execute: cacheEmoteExecution,
};
