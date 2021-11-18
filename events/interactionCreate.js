module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { client } = interaction;
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'An error occurred while executing the command.',
                ephemeral: true,
            });
        }
    },
};
