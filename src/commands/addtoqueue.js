const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtoqueue')
        .setDescription('Adds a song to the current queue.'),
    async execute(interaction) {
        console.log(
            `${interaction.author.username} added a song to the queue.`
        );
    },
};
