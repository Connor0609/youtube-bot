import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import googleSearch from "../../youtube/search";

export default {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Gives the first video for the provided search")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("What to search Youtube for")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const queryTerm = interaction.options.getString("query", true);
      console.log(`Query term for search is ${queryTerm}`);
      const videoId = await googleSearch(queryTerm);
      if (videoId) {
        interaction.reply(`https://www.youtube.com/watch?v=${videoId}`);
      } else {
        interaction.reply(`No video found`);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
