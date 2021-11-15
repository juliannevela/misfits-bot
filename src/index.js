const { Client, Collection } = require('discord.js');
const fs = require('fs');

const config = require('./config/_config.json');

const functions = fs
    .readdirSync('./src/functions')
    .filter((file) => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events');
const commandFolders = fs.readdirSync('./src/commands');

const client = new Client({
    intents: 641,
});

client.commands = new Collection();

(async () => {
    functions.forEach((file) => {
        require(`./functions/${file}`)(client);
    });
    client.handleEvents(eventFiles, config, './src/events');
    client.handleCommands(commandFolders, config, './src/commands');
    client.login(config.token);
})();
