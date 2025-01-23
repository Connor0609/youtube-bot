"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("../config.json");
const utility_1 = __importDefault(require("./commands/utility"));
const discord = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
discord.once(discord_js_1.Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
discord.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    const command = utility_1.default[interaction.commandName];
    if (!command) {
        console.log(`No command named ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (e) {
        console.error(e);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error executing this command",
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
        }
        else {
            await interaction.reply({
                content: "There was an error executing this command",
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
        }
    }
});
discord.login(config_json_1.discord_token);
