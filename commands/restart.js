const db = require("../libraries/dataManager");

module.exports.config = {
  name: "restart",
  description: "Restart bot",
  usage: "restart",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if ((await db.GetUser(message.author)).admin) {
    message.channel.send("Bot is restarting...");
    bot.unloadCommands();
    process.exit(0);
  } else {
    message.reply("You do not have permission to use this command.");
  }
};
