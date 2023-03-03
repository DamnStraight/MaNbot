import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command<Cached extends CacheType = CacheType> {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction<Cached>) => void;
}
