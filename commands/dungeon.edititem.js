//Dungeon commands

const dungeon = require("../libraries/dungeon");
const db = require("../libraries/dataManager");

module.exports.config = {
  name: "edititem",
  description: "Edit item",
  usage: "edititem {key} {value}",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 3) return;

  if ((await db.GetUser(message.author)).admin) {
    let name = "";

    // Name can with spaces, example: "Iron sword"
    if (args[0].startsWith('"')) {
      args[0] = args[0].substring(1);

      for (let i = 0; i < args.length; i++) {
        if (args[i].includes('"')) {
          name = args
            .splice(0, i + 1)
            .join(" ")
            .replace('"', "");
        }
      }
    } else {
      name = args.shift();
    }

    const key = args.shift();

    // Value can also with spaces
    const value = args.join(" ");

    try {
      const item = await dungeon.EditItem(name, key, value);
      message.reply(
        "`" +
          item.name +
          "` has been successfully updated! ```" +
          JSON.stringify(item) +
          "```"
      );
    } catch (e) {
      message.react("😤");
    }
  }
};
