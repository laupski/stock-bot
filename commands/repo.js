const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get information about this bot.'),
  async execute(interaction) {
    return interaction.reply('Stock Bot developed by laupski. Code available at https://github.com/laupski/stock-bot');
  },
};
