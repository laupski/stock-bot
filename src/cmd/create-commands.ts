import * as fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Config, EnvironmentConfig } from '../config';

async function main(config: Config) {
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

(async () => {
  await main(new EnvironmentConfig());
})();
