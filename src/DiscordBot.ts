import { Client } from "discord.js";
import commandMap from "./commands";
import config from "./config/config";
import { addToEmoteCount } from "./service/emote.service";
import { addMessage } from "./service/message.service";
import { containsEmote } from "./util/emote.utils";

export default class DiscordBot {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  public start(): void {
    this.client.on("ready", async () => {
      await this.client.user.setPresence({
        status: "online",
        game: { name: config.settings.bot.status }
      });
      console.log("Bot is up");
    });

    this.client.on("message", async message => {
      if (message.author.id !== this.client.user.id) {
        const command = commandMap.get(message.content.split(" ")[0]);

        if (command) await command(message);

        if (containsEmote(message.content)) await addToEmoteCount(message);
      }
      await addMessage(message);
    });

    this.client.login(config.settings.bot.token);
  }
}
