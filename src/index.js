const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./lib/config/_config.json');
const { CommandHandler, EventHandler } = require('./listeners');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.commands = new Collection();

CommandHandler(client);
EventHandler(client);

client.login(token);
