const db = require("../libraries/dataManager");

module.exports.config = {
  name: "reload",
  description: "Reload bot commands",
  usage: "reload",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if ((await db.GetUser(message.author)).admin) {
    const msg = await message.channel.send("Reload in progress...");
    bot.unloadCommands();
    bot.loadCommands();
    msg.edit("The commands have been reloaded!");
  } else {
    message.reply("You do not have permission to use this command.");
  }
};
