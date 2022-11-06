import { CommandInteraction, SlashCommandBuilder } from "discord.js";

// ─── Command Details ───────────────────────────────────────────────────── ✣ ─

const changeThemeCommand = new SlashCommandBuilder()
  .setName("changetheme")
  .setDescription("Change emotes to specified theme");

// ─── Command Execution ─────────────────────────────────────────────────── ✣ ─

async function changeThemeExecution(interaction: CommandInteraction) {
  await interaction.reply("Placeholder text here");
}

module.exports = {
  data: changeThemeCommand,
  execute: changeThemeExecution,
};
