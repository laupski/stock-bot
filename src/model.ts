import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';

export type StockBotSlashCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction) => Promise<any>;
};
