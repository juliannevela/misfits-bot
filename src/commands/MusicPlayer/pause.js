const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song.')
        .addSubcommand((subCommand) =>
            subCommand.setName('pause').setDescription('Pauses the music.')
        )
        .addSubcommand((subCommand) =>
            subCommand.setName('resume').setDescription('Resumes the music.')
        ),
    async execute(interaction) {
        const { client } = interaction;

        await interaction.deferReply();

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return interaction.followUp({
                content: '❌ | No music is being played!',
            });

        if (queue.connection.paused) {
            try {
                queue.setPaused(false);
                return interaction.followUp({
                    content: '▶ | Resumed!',
                });
            } catch (error) {
                return interaction.followUp({
                    content: '❌ | Failed to resume!',
                });
            }
        }
        try {
            queue.setPaused(true);
            return interaction.followUp({
                content: '⏸ | Paused!',
            });
        } catch (error) {
            return interaction.followUp({
                content: '❌ | Failed to pause!',
            });
        }
    },
};
