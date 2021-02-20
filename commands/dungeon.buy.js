//Dungeon commands
const Discord = require("discord.js");
const dungeon = require("../libraries/dungeon");

module.exports.config = {
  name: "buy",
  description: "Buy item from shop",
  usage: "buy",
  admin: false,
};

module.exports.run = async (bot, message, args) => {
  const item = await dungeon.GetItem(args.join(" ").toLowerCase());

  try {
    await dungeon.BuyItem(item, message.author);
    message.channel.send(
      `you bought a ${dungeon.DisplayItemName(item)} for ${item.buy} gold`
    );
  } catch (ex) {
    message.channel.send(ex.reason);
  }
};
