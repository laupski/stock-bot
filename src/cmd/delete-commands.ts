import { REST } from '@discordjs/rest';
import { Routes, RESTGetAPIApplicationGuildCommandsResult } from 'discord-api-types/v9';
import { Config, EnvironmentConfig } from '../config';

async function main(config: Config) {
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

(async () => {
  await main(new EnvironmentConfig());
})();
