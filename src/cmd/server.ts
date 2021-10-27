import * as fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import { Config, EnvironmentConfig } from '../config';
import { StockBotSlashCommand } from '../model';

async function main(config: Config) {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  const commands = new Collection<string, StockBotSlashCommand>();
  const commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const command = require(`${__dirname}/../commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    commands.set(command.data.name, command);
  }

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (typeof command === 'undefined') return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Failed to execute ${command} with interaction ${interaction}: ${error}`);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });

  await client.login(config.botToken);
}

(async () => {
  await main(new EnvironmentConfig());
})();
