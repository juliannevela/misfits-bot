const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops a song from YouTube'),
    async execute(interaction) {
        console.log(`${interaction.author.username} stopped the music.`);
    },
};
