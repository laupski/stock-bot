import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { Config } from './config';

export type StockBotSlashCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction, config: Config) => Promise<any>;
};
