import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import querystring from "node:querystring";

// ─── Command Details ───────────────────────────────────────────────────── ✣ ─

const chatBotCommand = new SlashCommandBuilder()
  .setName("shitpost")
  .setDescription("Generate a random message from user markov chain")
  .addStringOption((option) =>
    option
      .setName("user")
      .setDescription("Generate a shitpost from this users post history")
      .addChoices(
        { name: "Cloudrunner", value: "169633774257176577" },
        { name: "Renbot", value: "111815854492061696" },
        { name: "DamnStraight", value: "122512846041907203" }
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("initial")
      .setDescription(
        "Attempt to set a start seed for the markov chain (might fail)"
      )
      .setMaxLength(50)
  );

// ─── Command Execution ─────────────────────────────────────────────────── ✣ ─

export const getMessage = async (
  botId: string,
  seed: string = "",
  size: number = 200
) => {
  try {
    const response = await fetch(
      // Set a env url for this
      `http://127.0.0.1:5000/generateMessage?${querystring.stringify({
        botId,
        size,
        seed,
      })}`
    );

    return await response.json();
  } catch {
    return "Internal server error";
  }
};

async function chatBotExecution(interaction: ChatInputCommandInteraction) {
  const botId = interaction.options.getString("user");
  const maybeSeed = interaction.options.getString("initial")?.trim();

  if (!botId) {
    return "Internal Server Error";
  }

  const message = await getMessage(botId, maybeSeed);

  interaction.reply(message);
}

module.exports = {
  data: chatBotCommand,
  execute: chatBotExecution,
};
