import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import googleSearch from "../../youtube/search";

export default {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Gives the first video for the provided search"),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const videoId = await googleSearch(
        interaction.options.getString("query", true)
      );
      interaction.reply(`https://www.youtube.com/watch?v=${videoId}`);
    } catch (e) {
      console.log(e);
    }
  },
};
