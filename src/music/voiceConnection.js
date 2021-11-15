const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = (guild, voiceChannel) => {
    joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
    });
};
