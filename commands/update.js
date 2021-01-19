const db = require("../libraries/dataManager");
const { exec } = require("child_process");

module.exports.config = {
  name: "update",
  description: "Fetch git and restart bot",
  usage: "update",
};

module.exports.run = async (bot, message, args) => {
  if ((await db.GetUser(message.author)).admin) {
    const msg = await message.channel.send("Git fetching...");

    //Git pull force
    exec("git fetch --all && git reset --hard origin/production", async (err) => {
      if (err) return msg.edit("Git fetch failed. " + err);

      //Log last commit
      exec("git log --name-status --oneline  -1", async (err, stdout, stderr) => {
        if (!err) await message.channel.send("```Commit: " + stdout + "```");

        await msg.edit("Git fetch successful, restart bot.");
        bot.unloadCommands();
        process.exit(0);
      });
    });
  } else {
    message.reply("You do not have permission to use this command.");
  }
};
