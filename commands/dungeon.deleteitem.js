//Dungeon commands

const dungeon = require("../libraries/dungeon");
const db = require("../libraries/dataManager");

module.exports.config = {
  name: "item-delete",
  description: "Delete exist item",
  usage: "item-delete {name}",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return;

  if ((await db.GetUser(message.author)).admin) {
    const name = args.join(" ");

    const exist = await dungeon.GetItem(name);
    if (exist) {
      await dungeon.DeleteItem(name);
      message.reply(`${name} has been successfully deleted!`);
    } else {
      message.react("😤");
    }
  }
};
