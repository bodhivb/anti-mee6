const { muteUser } = require("../libraries/muteManager");

module.exports.config = {
  name: "mute",
  description: "Mute someone who is irritating",
  usage: "mute {user} {date} {reason}",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 3)
    return message.reply(
      "The parameter is incorrect. Try using it like: `" + this.config.usage + "`"
    );

  //Set targer
  const targetUser = message.mentions.members.first();
  const success = await muteUser(message, targetUser, args[1], args[2]);
  message.react(success ? "✅" : "❌");
};
