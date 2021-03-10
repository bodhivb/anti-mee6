const fs = require("fs");

const BaseCommand = {
  name: "wip",
  description: "none",
  usage: "-",
  aliases: [],
  admin: false,
  enabled: true
};

module.exports = (bot) => {
  /** Loads each command in "commands" folder */
  bot.loadCommands = () => {
    console.log("Loading commands...");
    try {
      fs.readdirSync("./commands/").forEach((file) => {
        //Only js code may be loaded
        if (!file.endsWith(".js")) return;

        const command = require(`../commands/${file}`);
        command.config = MakeValid(command.config, BaseCommand);
        const commandName = command.config.name;
        command.config.file = file;
        if (command.config.enabled) {
          bot.commands.set(commandName, command);
          console.log(`Loaded command ${commandName} (${file})`);
        }
      });
    } catch (err) {
      console.log(`Error while loading commands. ${err}`);
    }
  };

  /** Unloads each command in "commands" folder */
  bot.unloadCommands = () => {
    console.log("Unloading commands...");
    try {
      fs.readdirSync("./commands/").forEach((file) => {
        //Only js code is loaded
        if (!file.endsWith(".js")) return;
        try {
          delete require.cache[require.resolve(`../commands/${file}`)];
        } catch { }
      });
      bot.commands.clear();
    } catch (err) {
      console.log(`Error while unloading commands. ${err}`);
    }
  };

  bot.getUserFromMention = (mention) => {
    if (!mention) return;

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      return bot.users.cache.get(mention);
    }
  };
};

function MakeValid(ob, compare) {
  let newob = {};
  for (let prop in compare) newob[prop] = (!NullOrUndefined(ob[prop])) ? ob[prop] : compare[prop];
  return newob;
}
module.exports.MakeValid = MakeValid;
module.exports.baseCommand = BaseCommand;

function NullOrUndefined(o) {
  return (o == undefined || o == null);
}