const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addToQueue')
        .setDescription('Adds a song to the current queue.'),
};
