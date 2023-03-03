import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { readdir, readFile } from "fs/promises";
import { createConnection } from "../datasource/connection";
import { tEmote } from "../datasource/definitions";
// ─── Command Details ───────────────────────────────────────────────────── ✣ ─

type StringOption = Array<{ name: string, value: string }>;
/**
 * Check the specified emote directory, and return each subdirectory as a theme option
 */
const getThemeOptions = (): StringOption => {
  const directory = process.env.EMOTE_DIRECTORY;

  if (directory === undefined)
    throw new Error("EMOTE_DIRECTORY environment variable is not set!");

  const directories = readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => ({ name, value: name }));

  return directories;
};

const changeThemeCommand = new SlashCommandBuilder()
  .setName("changetheme")
  .setDescription("Change emotes to specified theme")
  .addStringOption((option) =>
    option
      .setName("theme")
      .setDescription("Choose an available emote theme")
      .addChoices(...getThemeOptions())
      .setRequired(true)
  );

// ─── Command Execution ─────────────────────────────────────────────────── ✣ ─

async function readEmoteNames(path: string) {
  const filesInDirectory = await readdir(path, {
    withFileTypes: true,
    encoding: "utf8",
  });

  const emotes = filesInDirectory
    .filter(
      (dirent) => dirent.isFile() && dirent.name.toLowerCase().endsWith(".png")
    )
    .map((dirent) => dirent.name.replace(".png", ""));

  return emotes;
}

async function changeThemeExecution(interaction: ChatInputCommandInteraction) {
  const selectedTheme = interaction.options.getString("user");
  const directory = process.env.EMOTE_DIRECTORY;

  if (directory === undefined)
    return await interaction.reply("Emote directory not set");

  const connection = createConnection();
  const themedEmotes = await readEmoteNames(`${directory}/${selectedTheme}`);

  // Check whether the emotes we are trying to re-theme actually exist
  // FIXME use the GuildManager emoji cache rather than the database
  const emotes = await connection
    .selectFrom(tEmote)
    .select({
      discordId: tEmote.discordId,
      name: tEmote.name,
    })
    .where(tEmote.name.in(themedEmotes))
    .executeSelectMany();

  const emojiManager = interaction.guild?.emojis;
  // Filter out any emotes that exist in the directory not in the guild
  const existingEmotes = emotes.filter(
    (emote) => themedEmotes.some((themedEmote) => themedEmote === emote.name)
  );

  for (const existingEmote of existingEmotes) {
    // Buffer the replacement emoute
    const newEmote = await readFile(
      `${directory}/${selectedTheme}/${existingEmote.name}.png`
    );
    // Fetch the emote we are replacing so we can delete it
    const fetchEmote = await emojiManager?.guild.emojis.cache.find(emoji => emoji.name === existingEmote.name);

    if (fetchEmote) {
      await emojiManager?.delete(fetchEmote);
      await emojiManager?.create({
        attachment: newEmote,
        name: existingEmote.name,
      });
    }
  }

  await interaction.reply("Placeholder text here");
}

module.exports = {
  data: changeThemeCommand,
  execute: changeThemeExecution,
};
