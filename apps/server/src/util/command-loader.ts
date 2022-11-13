import fs from "fs";
import path from "path";
import { Command } from "../types/Command";

/**
 * Returns all the commands created in the 'src/commands/*' directory.
 *
 * @returns {Command[]}
 */
export default function loadCommands(): Command[] {
  let commands: Command[] = [];

  const commandPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file: string) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath) as Command;

    commands.push(command);
  }

  return commands;
}
