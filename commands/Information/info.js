const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
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
        )
		.addSubcommand((subcommand) => 
			subcommand
				.setName('commands')
				.setDescription('Retrieves a list of the available commands.')
		),
    async execute(interaction) {
        switch(interaction.subcommand) {
			case 'user':
				await interaction.reply(
                `${interaction.user.username}'s ID is ${interaction.user.id}`
            	);
				break;
			case 'server':
				await interaction.reply(
            `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
        		);
				break;
			case 'commands':
				await interaction.reply({
					content: '',
					ephemeral: true,
				})
			default: 
				await interaction.reply({
					content: '❌ | Please enter a valid subcommand!',
					ephemeral: true,
				})
				break;
		}
    },
};
