module.exports.config = {
  name: "restart",
  description: "Restart bot",
  usage: "restart",
};

module.exports.run = async (bot, message, args) => {
  //TODO check if user isAdmin

  message.channel.send("Bot is restarting...");
  bot.unloadCommands();
  process.exit(0);
};
