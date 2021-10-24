const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.BOT_TOKEN;

if (clientId === '' || typeof clientId === 'undefined') {
  console.error('Client ID not set, exiting');
  process.exit(1);
}
if (guildId === '' || typeof guildId === 'undefined') {
  console.error('Guild ID not set, exiting');
  process.exit(1);
}
if (token === '' || typeof token === 'undefined') {
  console.error('Bot token not set, exiting');
  process.exit(1);
}

const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId))
  .then((data) => {
    const promises = [];
    for (const command of data) {
      const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
      promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
  });
console.log('Successfully deleted commands');
