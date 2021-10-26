const { SlashCommandBuilder } = require('@discordjs/builders');
const alpha = require('alphavantage')({ key: process.env.ALPHAKEY });

module.exports = {
  data: new SlashCommandBuilder()
    .setName('price')
    .setDescription('Get price of a ticker')
    .addStringOption((option) => option.setName('ticker').setDescription('The ticker to get a quote')),
  async execute(interaction) {
    const ticker = interaction.options.getString('ticker');
    if (ticker) {
      alpha.data
        .quote(ticker)
        .then((data) => {
          console.log(data);
          const price = data['Global Quote']['05. price'];
          const percent = data['Global Quote']['10. change percent'];
          const previousclose = data['Global Quote']['08. previous close'];
          return interaction.reply(
            `Current price of \`${ticker}\`: ${price} (${percent}) Previous close: ${previousclose}`
          );
        })
        .catch((error) => {
          console.error(error);
          return interaction.reply('Error has occurred');
        });
    } else {
      return interaction.reply('No ticker has been chosen');
    }
    return null;
  },
};
