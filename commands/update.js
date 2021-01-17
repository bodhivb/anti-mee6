const db = require("../libraries/dataManager");
const { exec } = require("child_process");

module.exports.config = {
  name: "update",
  description: "Fetch git and restart bot",
  usage: "update",
};

module.exports.run = async (bot, message, args) => {
  if ((await db.GetUser(message.author)).admin) {
    const msg = await message.channel.send("Git fetch...");

    exec("git fetch --all && git reset --hard origin/production", (err) => {
      if (err) return msg.edit("Git fetch failed. " + err);

      await msg.edit("Git fetch successful, restart bot.");
      bot.unloadCommands();
      process.exit(0);
    });
  } else {
    message.reply("You do not have permission to use this command.");
  }
};
