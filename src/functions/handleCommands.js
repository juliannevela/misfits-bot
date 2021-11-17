const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        commandFolders.forEach((folder) => {
            const commandFiles = fs
                .readdirSync(`${path}/${folder}`)
                .filter((file) => file.endsWith('.js'));
            commandFiles.forEach((file) => {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            });
        });

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        const CLIENT_ID = '891862922991665223';
        const {
            GUILD_TEST,
            // GUILD_PROD
        } = process.env;

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_TEST),
                    {
                        body: client.commandArray,
                    }
                );

                console.log('Successfully completed registering (/) commands!');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};
