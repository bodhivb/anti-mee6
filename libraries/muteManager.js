const { Channels } = require("./constants");

//Mute someone
module.exports.muteUser = async (message, member, date, reason = "") => {
  return new Promise((res) => {
    let muteRole = message.guild.roles.cache.find((r) => r.name === "Muted");

    if (!muteRole) {
      muteRole = this.createMuteRole(message);
    }

    member.roles
      .add(muteRole.id)
      .then(() => {
        this.sendInfo(message, member, date, reason);
        this.logPrisoner(message, member, date, reason);
        res(true);
      })
      .catch(() => res(false));
  });
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

// Only Anti-MEE6 guild (jail)
module.exports.sendInfo = (message, member, date, reason = "") => {
  const msg = [
    member,
    `You don't follow the #rules and so you are now **muted** for ${date}.`,
    `Reason: ${reason}.\n`,
    "If you think this action is a mistake, let us explain via chat here.",
  ].join("\n");
  message.guild.channels.cache.get(Channels.JAIL).send(msg);
};

// Only Anti-MEE6 guild (prisoner-logs)
module.exports.logPrisoner = (message, member, date, reason = "", said = "") => {
  const body = [
    `**User:** ${member}`,
    `**Duration:** ${date}`,
    `**Reason:** ${reason}`,
    `**Channel:** ${message.channel}`,
    `**Message:** ${said}`,
  ].join("\n");

  message.guild.channels.cache.get(Channels.PRISONERLOGS).send({
    embed: {
      author: {
        name: `${member.user.tag} muted`,
        icon_url: member.user.displayAvatarURL({ dynamic: true }),
      },
      description: body,
      color: 11873778,
      footer: {
        text: `Muted by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL({ dynamic: true }),
      },
      timestamp: message.createAt,
    },
  });
};
