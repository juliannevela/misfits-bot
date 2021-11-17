module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(
            `${client.user.username} has just arrived in the tavern! Use '/play' to make a request!`
        );
    },
};
