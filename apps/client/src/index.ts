import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import loadCommands from "./command-loader";

dotenv.config({ path: "../../.env" });

// ─── Initialize Bot ────────────────────────────────────────────────────── ✣ ─

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

// ─── Load Slash Commands ───────────────────────────────────────────────── ✣ ─

client.commands = new Collection();

const commands = loadCommands();

commands
  .filter((command) => "data" in command && "execute" in command)
  .forEach((command) => client.commands.set(command.data.name, command));

// ─── Bot Event Listeners ───────────────────────────────────────────────── ✣ ─

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TOKEN);
