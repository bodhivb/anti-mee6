const db = require("../libraries/dataManager");

module.exports.config = {
  name: "clear",
  description: "clear message",
  usage: "clear {count}",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if ((await db.GetUser(message.author)).admin) {
    if (!args[0]) return message.channel.send("You forgot to add delete counter");
    try {
      message.channel
        .bulkDelete(args[0])
        .catch(() =>
          message.channel.send("The argument must be a number between 0 and 100")
        );
    } catch (e) {
      message.channel.send("The argument must be a number between 0 and 100");
    }
  } else {
    message.reply("You do not have permission to use this command.");
  }
};
