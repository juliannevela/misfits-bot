/* eslint-disable no-irregular-whitespace */
/* eslint-disable indent */
require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
require('colors');
const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./utils/player');

const functions = fs
    .readdirSync('./src/functions')
    .filter((file) => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events');
const commandFolders = fs.readdirSync('./src/commands');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

const defaultPlayerOptions = {
    leaveOnEmpty: false,
    leaveOnEnd: false,
    leaveOnStop: false,
    initialVolume: 0.5,
    bufferingTimeout: 5000,
    ytdlOptions: {
        highWaterMark: 1 << 25,
        quality: 'highestaudio',
    },
};

client.commands = new Collection();
client.player = new Player(client, defaultPlayerOptions);
registerPlayerEvents(client.player);

const nessiSign = `
         ▂╱▔▔╲╱▔▔▔▔╲╱▔▔╲▂
         ╲┈▔╲┊╭╮┈┈╭╮┊╱▔┈╱
         ┊▔╲╱▏┈╱▔▔╲┈▕╲╱▔┊
         ┊┊┊┃┈┈▏┃┃▕┈┈┃┊┊┊
         ┊┊┊▏╲┈╲▂▂╱┈╱▕┊┊┊
█▄░█ █▀▀ █▀ █▀ █  █▀▀ █▀█ █▀▄ █▀▀ █▀
█░▀█ ██▄ ▄█ ▄█ █  █▄▄ █▄█ █▄▀ ██▄ ▄█`;

(async () => {
    functions.forEach((file) => {
        require(`./functions/${file}`)(client);
    });
    console.log(nessiSign.rainbow);
    client.handleEvents(eventFiles, './src/events');
    client.handleCommands(commandFolders, './src/commands');
    // Uncomment if you want to use the see the current player options.
    // console.log('Player Options: ', client.player.options);
    // console.log('====================================');
    client.login(process.env.TOKEN);
})();
