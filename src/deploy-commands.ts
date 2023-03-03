import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import loadCommands from "./util/command-loader";

dotenv.config();
// dotenv.config({ path: "../.env" });

const commands = loadCommands();

const jsonCommands = commands.map((command) => { 
  console.log(command);
  return command.data.toJSON() 
});

// ─── Push Commands To Discord ──────────────────────────────────────────── ✣ ─

const rest = new REST({ version: "10" }).setToken(
  process.env.BOT_TOKEN as string
);

(async () => {
  try {
    console.log(`Refreshing slash commands...`);

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: jsonCommands }
    );

    console.log(`Successfully reloaded ${data.length} commands.`);
  } catch (error) {
    console.log(error);
  }
})();
