const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
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
    );

module.exports = {
    data,
    async execute(interaction) {
        if (interaction.subcommand === 'user') {
            await interaction.reply(
                `${interaction.user.username}'s ID is ${interaction.user.id}`
            );
        }
        await interaction.reply(
            `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
        );
    },
};
