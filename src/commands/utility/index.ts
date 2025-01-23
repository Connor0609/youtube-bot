import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import youtube from "./search";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export type Commands = {
  [key: string]: Command;
};

const commands: Commands = {
  youtube,
};

export default commands;
