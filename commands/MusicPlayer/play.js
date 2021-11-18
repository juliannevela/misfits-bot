const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song from YouTube')
        .addStringOption((option) =>
            option
                .setName('query')
                .setRequired(true)
                .setDescription('The URL of the song to play')
        ),
    async execute(interaction) {
        const { client } = interaction;
        const guild = client.guilds.cache.get(interaction.guildId);
        const channel = guild.channels.cache.get(interaction.channelId);
        const query = interaction.options.get('query').value;

        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine:
                    interaction.commandName === 'soundcloud'
                        ? QueryType.SOUNDCLOUD_SEARCH
                        : QueryType.AUTO,
            })
            .catch((err) => console.error(err));

        const queue = await client.player.createQueue(guild, {
            metadata: channel,
        });

        const member =
            guild.members.cache.get(interaction.user.id) ??
            (await guild.members.fetch(interaction.user.id));

        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            client.player.deleteQueue(interaction.guildID);
            return interaction.reply({
                content: 'Could not join your voice channel!',
            });
        }

        await interaction.deferReply();

        if (!searchResult || !searchResult.tracks.length)
            return interaction.followUp({
                content: 'No results were found!',
            });

        await interaction.followUp({
            content: `⏱ | Loading your ${
                searchResult.playlist ? 'playlist' : 'track'
            }...`,
        });
        // eslint-disable-next-line no-unused-expressions
        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
