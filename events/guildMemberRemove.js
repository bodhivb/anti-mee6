const { Invites, Bots, Guilds } = require("../libraries/constants");
const userManager = require("../libraries/memberJoinManager");

//member leave / kick
const channelId = "799623827930742784";

module.exports = async (bot, member) => {
  //if MEE6
  if (member.user.id == Bots.MEE6 && member.guild.id == Guilds.ANTIMEE6) {
    const channel = member.guild.channels.cache.get(channelId);
    if (process.env.ENVIRONMENT != "DEV")
      channel.send(`@ developer, MEE6 Was kicked, invite again! \n${Invites.MEE6}`);
  } else {
    userManager.getUser(member.user.id);
  }
};
