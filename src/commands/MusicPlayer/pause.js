const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the music.'),
    async execute(interaction) {
        console.log(`${interaction.author.username} paused the music.`);
    },
};
