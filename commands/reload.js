module.exports.config = {
  name: "reload",
  description: "Reload bot commands",
  usage: "reload",
};

module.exports.run = async (bot, message, args) => {
  //TODO check if user isAdmin

  const msg = await message.channel.send("Reload in progress...");
  bot.unloadCommands();
  bot.loadCommands();
  msg.edit("The commands have been reloaded!");
};
