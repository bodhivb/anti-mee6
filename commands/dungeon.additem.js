//Dungeon commands

const dungeon = require("../libraries/dungeon");
const db = require("../libraries/dataManager");

module.exports.config = {
  name: "item-add",
  description: "Add new item",
  usage: "item-add {name}",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return;

  if ((await db.GetUser(message.author)).admin) {
    const name = args.join(" ").toLowerCase();

    const exist = await dungeon.GetItem(name);
    if (exist) return message.reply(`This name is already in use`);

    await dungeon.CreateItem(name);
    message.reply(`${name} has been successfully created!`);
  }
};
