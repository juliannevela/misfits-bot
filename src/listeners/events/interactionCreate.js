module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`Interaction created: ${interaction.id}`);
    },
};
