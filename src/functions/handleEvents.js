module.exports = (client) => {
    client.handleEvents = async (eventFiles) => {
        eventFiles.forEach((file) => {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) =>
                    event.execute(...args, client)
                );
            }
            client.on(event.name, (...args) => event.execute(...args, client));
        });
    };
};
