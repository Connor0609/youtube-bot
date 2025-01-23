import { REST, Routes } from "discord.js";
import { client_id, guild_id, discord_token } from "../config.json";
import commands from "./commands/utility";

const rest = new REST().setToken(discord_token);
(async () => {
  try {
    const commandsArray = Object.values(commands).map((command) =>
      command.data.toJSON()
    );
    console.log(
      `Started refreshing ${commandsArray.length} application (/) commands.`
    );
    await rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
      body: commandsArray,
    });
    console.log(
      `Successfully reloaded ${commandsArray.length} application (/) commands`
    );
  } catch (e) {
    console.error(e);
  }
})();
