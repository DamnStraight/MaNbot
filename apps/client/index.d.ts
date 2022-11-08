import { Collection } from "discord.js";
import { Command } from "./src/types/Command";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}
