import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import search from "./search";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export type Commands = {
  [key: string]: Command;
};

const commands: Commands = {
  search,
};

export default commands;
