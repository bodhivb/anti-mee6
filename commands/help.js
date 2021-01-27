const db = require('../libraries/dataManager');
module.exports.config = {
  name: "help",
  description:
    "Show you all of the commands. With {command} you can search for a specific command",
  usage: "help {command}",
  aliases: ["command"],
};

module.exports.run = async (bot, message, args) => {
  //Specific command
  if (args[0] && args[0] !== "") {
    const command = bot.commands.get(args[0]);
    if (command) {
      return message.channel.send({
        embed: {
          title: command.config.name + " command",
          color: 3447003,
          fields: [
            { name: "Description", value: command.config.description, inline: true },
            { name: "Usage", value: "`" + command.config.usage + "`", inline: true },
          ],
        },
      });
    } else {
      return message.channel.send({
        embed: {
          color: 15105570,
          description:
            "Sorry, " +
            args[0] +
            " does not exist. You can see which commands are available via `help`",
        },
      });
    }
  }

  //All commands
  const { admin } = await db.GetUser(message.author);
  let helpMessages = [];
  bot.commands.forEach((command) => {
    if (!command.config.enabled) return;
    if (command.config.admin && !admin) return;
    helpMessages.push({
      name: command.config.name,
      value: command.config.description + `. \nUsage: \`@${bot.user.username}#${bot.user.discriminator} ` + command.config.usage + "`",
    });
  });
  message.author.send({
    embed: {
      title: "Available commands",
      description: `[] = required parameters\n{} = optional parameters`,
      color: 12901133,
      fields: helpMessages,
    },
  });

  message.channel.send("Help pages has been sent to you");
};
