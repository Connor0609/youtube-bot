"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("../config.json");
const utility_1 = __importDefault(require("./commands/utility"));
const rest = new discord_js_1.REST().setToken(config_json_1.discord_token);
(async () => {
    try {
        const commandsArray = Object.values(utility_1.default).map((command) => command.data.toJSON());
        console.log(`Started refreshing ${commandsArray.length} application (/) commands.`);
        await rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.client_id, config_json_1.guild_id), {
            body: commandsArray,
        });
        console.log(`Successfully reloaded ${commandsArray.length} application (/) commands`);
    }
    catch (e) {
        console.error(e);
    }
})();
