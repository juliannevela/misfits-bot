const fs = require('fs');

module.exports = ({ commands }) => {
    const commandFiles = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.set(command.data.name, command);
    }
};
