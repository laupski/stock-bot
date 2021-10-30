import { Config } from '../config';

const { SlashCommandBuilder } = require('@discordjs/builders');

export = {
  data: new SlashCommandBuilder()
    .setName('price')
    .setDescription('Get price of a ticker')
    .addStringOption((option) => option.setName('ticker').setDescription('The ticker to get a quote')),

  async execute(interaction, config: Config) {
    // eslint-disable-next-line global-require
    const fmp = require('financialmodelingprep')(config.fmpKey);
    const ticker = interaction.options.getString('ticker');
    if (ticker) {
      fmp
        .stock(ticker)
        .quote()
        .then((response) => {
          console.log(response);
          return interaction.reply(
            `Current price of ${ticker}: $${response[0].price} (${response[0].changesPercentage}%), volume: ${response[0].volume}`
          );
        })
        .catch((error) => {
          console.log(error);
          return interaction.reply('Error on fetching live price.');
        });
    } else {
      return interaction.reply('No ticker has been chosen');
    }
    return null;
  },
};
