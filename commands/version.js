const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Get current version of Stock Bot'),
  async execute(interaction) {
    return interaction.reply(`Current version of Stock Bot: \`${process.env.VERSION}\``);
  },
};
