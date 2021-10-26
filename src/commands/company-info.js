const { SlashCommandBuilder } = require('@discordjs/builders');
const alpha = require('alphavantage')({ key: process.env.ALPHAKEY });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('company-info')
    .setDescription('Get company info of a ticker')
    .addStringOption((option) => option.setName('ticker').setDescription('The ticker to get a quote')),
  async execute(interaction) {
    const ticker = interaction.options.getString('ticker');
    if (ticker) {
      alpha.fundamental.company_overview(ticker).then((data) => interaction.reply(`Company overview of \`${ticker}\`: ${data.Name} -- ${data.AssetType} \n${data.Description}`)).catch((error) => {
        console.error(error);
        return interaction.reply('Error has occurred');
      });
    } else {
      return interaction.reply('No ticker has been chosen');
    }
    return null;
  },
};
