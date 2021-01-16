module.exports.config = {
  name: "help",
  description: "An help page",
  usage: "help {command}",
};

module.exports.run = async (bot, message, args) => {
  let helpMessages = [];
  bot.commands.forEach((command) => {
    helpMessages.push({
      name: command.config.name,
      value: command.config.description + ". Usage: " + command.config.usage,
    });
  });

  message.channel.send({
    embed: {
      title: "Help",
      fields: helpMessages,
    },
  });
};
