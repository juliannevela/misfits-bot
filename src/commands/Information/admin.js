const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Admin commands')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('test')
                .setDescription('Retrive Guild ID command.')
        ),
    async execute(interaction) {
        const { client } = interaction;
        if (interaction.author.id !== process.env.OWNER_ID) return;
        if (interaction.content.toLowerCase().split(' ')[1] === 'test') {
            client.guildId = interaction.guild.id;
            interaction.reply('Guild ID added successfully!');
        }
    },
};
