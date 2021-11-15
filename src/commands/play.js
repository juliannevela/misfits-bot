const { SlashCommandBuilder } = require('@discordjs/builders');
// const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube')
        .addStringOption((option) =>
            option
                .setName('url')
                .setRequired(true)
                .setDescription('The URL of the song to play')
        ),
    async execute(interaction) {
        console.log(`${interaction.author.username} started playing a song.`);
    },
};
