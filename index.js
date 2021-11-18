require('dotenv').config();
require('colors');
const keep_alive = require('./keep_alive.js');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { Player } = require('discord-player');

const { registerPlayerEvents } = require('./utils/player');

const functions = fs
	.readdirSync('./functions')
	.filter((file) => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events');
const commandFolders = fs.readdirSync('./commands');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

// Debugging info
// client.on('debug', console.log);
// client.on('warn', console.warn);
// client.on('error', console.error);

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
	console.log(nessiSign.rainbow);

	// Setup functions to handle events and commands
	functions.forEach((file) => {
		require(`./functions/${file}`)(client);
	});
	await client.handleCommands(commandFolders, './commands');
	await client.handleEvents(eventFiles, './events');

	const token = process.env.TOKEN;
	client.login(token).then(() => {
		client.user.setPresence({
			activities: [
				{
					name: 'for requests',
					type: 'WATCHING',
				},
			],
			status: 'online',
		});
	});
})();
