const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config/config.json');
// eslint-disable-next-line import/order
const alpha = require('alphavantage')({ key: config.alphavantage });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('price')
    .setDescription('Get price of a ticker')
    .addStringOption((option) => option.setName('ticker').setDescription('The ticker to get a quote')),
  async execute(interaction) {
    const ticker = interaction.options.getString('ticker');
    if (ticker) {
      alpha.data.quote(ticker).then((data) => {
        console.log(data);
        const price = data['Global Quote']['05. price'];
        return interaction.reply(`Current price of \`${ticker}\`: ${price}`);
      }).catch((error) => {
        console.error(error);
        return interaction.reply('Error has occurred');
      });
    } else {
      return interaction.reply('No ticker has been chosen');
    }
    return null;
  },
};
