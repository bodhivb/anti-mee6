//Mute someone
module.exports.muteUser = async (message, member, date, reason = "") => {
  let muteRole = await message.guild.roles.cache.find((r) => r.name === "Muted");

  if (!muteRole) {
    muteRole = await this.createMuteRole(message);
  }

  member.roles.add(muteRole.id).cache(message.channel.send);
};

//Setting up the muted role
module.exports.createMuteRole = async (message) => {
  //Create role
  const muteRole = await message.guild.roles.create({
    data: {
      name: "Muted",
      color: "#2f3136",
      permissions: [],
    },
    reason: "To mute user who spam",
  });

  //Set role to highest position
  let botMember = await message.guild.members.fetch(message.guild.me.id);
  await muteRole.setPosition(botMember.roles.highest.position - 1);

  //Set up role permission
  const mutePermission = {
    SEND_MESSAGES: false,
    ADD_REACTIONS: false,
    SPEAK: false,
  };

  //Apply mute permission to channels
  await Promise.all(
    msg.guild.channels.cache.map(async (channel) => {
      //Channel without parent are category or lose channel
      if (!channel.parent) {
        await channel.updateOverwrite(muteRole, mutePermission);
      }

      //Channel who does not sync with category
      if (channel.parent && !channel.permissionsLocked) {
        await channel.updateOverwrite(muteRole, mutePermission);
      }
    })
  );

  return muteRole;
};
