module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.username} has arrived to serenade you!`);
    },
};
