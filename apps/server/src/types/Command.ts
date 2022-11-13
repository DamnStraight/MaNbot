import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command<Cached extends CacheType = CacheType> {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction<Cached>) => void;
}
