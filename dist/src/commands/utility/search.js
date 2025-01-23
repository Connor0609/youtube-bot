"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const search_1 = __importDefault(require("../../youtube/search"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("youtube")
        .setDescription("Gives the first video for the provided search")
        .addStringOption((option) => option
        .setName("query")
        .setDescription("What to search Youtube for")
        .setRequired(true)),
    async execute(interaction) {
        try {
            const queryTerm = interaction.options.getString("query", true);
            console.log(`Query term for search is ${queryTerm}`);
            const videoId = await (0, search_1.default)(queryTerm);
            if (videoId) {
                interaction.reply(`https://www.youtube.com/watch?v=${videoId}`);
            }
            else {
                interaction.reply(`No video found`);
            }
        }
        catch (e) {
            console.log(e);
        }
    },
};
