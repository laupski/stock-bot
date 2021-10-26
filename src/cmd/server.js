/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const {
  Client,
  Collection,
  Intents,
} = require('discord.js');

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.BOT_TOKEN;
const alphakey = process.env.ALPHAKEY;

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
if (alphakey === '' || typeof alphakey === 'undefined') {
  console.error('Alpha Vantage API key not set, exiting');
  process.exit(1);
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync(`${__dirname}/../commands`)
  .filter((file) => file.endsWith('.js'));

console.log(`commandFiles is ${commandFiles}`);

for (const file of commandFiles) {
  const command = require(`${__dirname}/../commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(token);
