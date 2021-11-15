const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes playing the music'),
    async execute(interaction) {
        console.log(`${interaction.author.username} resumed the music.`);
    },
};
