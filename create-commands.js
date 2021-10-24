/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
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

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
