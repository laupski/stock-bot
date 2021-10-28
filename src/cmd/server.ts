import * as fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { RESTGetAPIApplicationGuildCommandsResult, Routes } from 'discord-api-types/v9';
import { Config, EnvironmentConfig } from '../config';
import { StockBotSlashCommand } from '../model';

async function createCommands(config: Config) {
  const commands: string[] = [];
  const commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const command = require(`${__dirname}/../commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '9' }).setToken(config.botToken);

  rest
    .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
      body: commands,
    })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}

async function deleteCommands(config: Config) {
  const rest = new REST({ version: '9' }).setToken(config.botToken);

  try {
    const commands = (await rest.get(
      Routes.applicationGuildCommands(config.clientId, config.guildId)
    )) as RESTGetAPIApplicationGuildCommandsResult;
    const deletePromises = commands.map((command) =>
      rest.delete(Routes.applicationGuildCommand(config.clientId, config.guildId, command.id))
    );
    await Promise.all(deletePromises);
    console.log('Successfully deleted commands');
  } catch (error) {
    throw new Error(`Failure deleting commands: ${error}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function foo() {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function bar() {}

async function main(config: Config) {
  try {
    await deleteCommands(config);
    await createCommands(config);
  } catch (error) {
    console.error(`Failed to recreate slash commands: ${error}`);
    process.exit(1);
  }

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
      await command.execute(interaction, config);
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
