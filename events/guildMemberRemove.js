//member leave / kick
const guildID = "799590946475999282"
const channelId = "799623827930742784"
const inviteUrl = "https://discord.com/oauth2/authorize?scope=bot&response_type=code&client_id=159985415099514880&guild_id=799590946475999282"
module.exports = async (bot, member) => {
  //if MEE6
  if (member.user.id == "159985870458322944" && member.guild.id == guildID) {
    const channel = member.guild.channels.cache.get(channelId);
    if (process.env.ENVIRONMENT != "DEV")
      channel.send(`@ developer, MEE6 Was kicked, invite again! \n${inviteUrl}`);
  }
};
