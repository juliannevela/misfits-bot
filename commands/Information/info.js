const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const commandEmbed = {
	"type": "rich",
	"title": `Available App Commands`,
	"description": "",
	"color": 0x00FFFF,
	"fields": [
		{
			"name": `🎧 /play ~ Plays a song from a YouTube URL.`,
			"value": "\u200B"
		},
		{
			"name": `🙅‍♂️ /pause [pause] ~ Pauses the current song.`,
			"value": "\u200B"
		},
		{
			"name": `🤟 /pause [resume] ~ Resumes playing the music.`,
			"value": "\u200B"
		},
		{
			"name": `🙉 /stop ~ Stops playing music in the active voice channel.`,
			"value": "\u200B"
		},
		{
			"name": `👁‍🗨 /help ~ Prints out a list of these commands.`,
			"value": "\u200B"
		}
	]
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Retrieve information about a user or a server.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription('Get information about a user.')
				.addUserOption((option) =>
					option
						.setName('target')
						.setDescription('The user to get information about.')
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('server')
				.setDescription('Get information about the server.')
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('commands')
				.setDescription('Retrieves a list of the available commands.')
		),
	async execute(interaction, channel) {
		try {
			if (interaction.subcommand === 'user') await interaction.reply(
				`${interaction.user.username}'s ID is ${interaction.user.id}`
			);
			if (interaction.subcommand === 'server')
				await interaction.reply(
					`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
				);
			if (interaction.subcommand === 'commands')
				await channel.send({ embeds: [commandEmbed] });
		} catch (error) {
			console.error(error);
		}
	},
};
