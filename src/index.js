const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { token } = require('./config/_config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.startsWith('cmd-'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs
    .readdirSync('./events')
    .filter((file) => file.startsWith('ev-'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
