import { SlashCommandBuilder } from '@discordjs/builders';

export = {
  data: new SlashCommandBuilder().setName('info').setDescription('Get stock bot info'),
  async execute(interaction) {
    interaction.reply('You can find more info at https://github.com/laupski/stock-bot');
  },
};
