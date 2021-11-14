const { SlashCommandBuilder } = require('@discordjs/builders');
// const ytdl = require('ytdl-core');

const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube')
    .addStringOption((option) =>
        option
            .setName('url')
            .setRequired(true)
            .setDescription('The URL of the song to play')
    );

module.exports = data;
