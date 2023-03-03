import {
  Collection,
  CommandInteraction,
  Message,
  SlashCommandBuilder,
  TextChannel,
  User
} from "discord.js";

import fs from "fs";
import { isAuthorized } from "../util/constants";

// ─── Command Details ───────────────────────────────────────────────────── ✣ ─

const messageHistoryCommand = new SlashCommandBuilder()
  .setName("scrape")
  .setDescription("Scrapes a user's chat history")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The user selected for scraping")
      .setRequired(true)
  );

// ─── Command Execution ─────────────────────────────────────────────────── ✣ ─

// Discord doesn't allow us to fetch more than 100 messages
const MESSAGE_LIMIT = 100;

// Used to filter out most messages containing obscure symbols like ASCII spam
const SPECIAL_CHARACTER_REGEX = new RegExp(
  "(?!.*[<|>|;|:|/|\\|-|.|?|(|)])[^ws]"
);

async function crawlUserMessages(
  channel: TextChannel,
  target: User,
  messageCount: number
) {
  let counter = 0,
    exhausted = false,
    before: undefined | string = undefined;

  let stream = fs.createWriteStream(`./chatlogs/${target.id}.txt`, { flags: "a" });

  do {
    const messages:
      | Collection<string, Message<true>>
      | Collection<string, Message<false>> = await channel.messages.fetch({
      limit: MESSAGE_LIMIT,
      cache: false,
      before,
    });

    for (const [key, value] of messages) {
      if (value.author.id === target.id) {
        if (
          !SPECIAL_CHARACTER_REGEX.test(value.content) &&
          value.content !== ""
        ) {
          counter++;
          stream.write(value.content + "\n");
        }
      }
      before = key;
    }

    // If we get less than 100 results it means we're at the end of the message history
    if (messages.size < 100) {
      exhausted = true;
    }

    // Keep going until we run out of messages or we've collected enough
  } while (counter < messageCount && !exhausted);

  stream.end();
}

async function messageHistoryExecution(interaction: CommandInteraction) {
  if (!isAuthorized(interaction.member?.user.id)) {
    return await interaction.reply("NOIDONTTHINKSO");
  }
  const target = interaction.options.getUser("target");

  const channel = interaction.channel;

  if (!channel || !target) {
    return await interaction.reply("Something went wrong!");
  }

  await interaction.deferReply();
  try {
    await crawlUserMessages(channel as any, target, 10000);
  } catch (e) {
    console.log("Error: ", e);
  }

  await interaction.editReply(`Scraped ${target.username}'s chat history.`);
}

module.exports = {
  data: messageHistoryCommand,
  execute: messageHistoryExecution,
};
