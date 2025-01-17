import { Client, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { discord_token } from "../config.json";
import commands from "./commands/utility";

const discord = new Client({ intents: [GatewayIntentBits.Guilds] });

discord.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

discord.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  const command = commands[interaction.commandName];
  if (!command) {
    console.log(`No command named ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (e) {
    console.error(e);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error executing this command",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error executing this command",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

discord.login(discord_token);
