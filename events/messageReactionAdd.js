const { Channels, ANTIMEE6Roles } = require("../libraries/constants");

module.exports = async (bot, reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch {
      return;
    }
  }

  const message = reaction.message;
  const emoji = reaction.emoji;

  //For auto-roles of Anti-MEE6 server
  if (message.channel.id === Channels.AUTOROLES) {
    for (let i = 0; i < ANTIMEE6Roles.length; i++) {
      if (emoji.name === ANTIMEE6Roles[i].emoji) {
        //Role found for this emoji
        try {
          message.guild.members.fetch(user.id).then((member) => {
            member.roles.add(ANTIMEE6Roles[i].role);
          });
          return;
        } catch {}
      }
    }
  }
};
