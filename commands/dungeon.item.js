//Dungeon commands
const Discord = require("discord.js");
const dungeon = require("../libraries/dungeon");

module.exports.config = {
  name: "item",
  description: "view specific item",
  usage: "item {name}",
  admin: false,
};

module.exports.run = async (bot, message, args) => {
  const item = await dungeon.GetItem(args.join(" "));

  if (item) {
    const embed = new Discord.MessageEmbed();

    embed.setTitle((item.emoji ? item.emoji + " " : "") + item.name);
    embed.setDescription(item.description);

    if (item.damage) embed.addField("Damage", item.damage, true);
    if (item.speed) embed.addField("Speed", item.speed, true);
    if (item.armor) embed.addField("Armor", item.armor, true);

    message.channel.send(embed);
  } else {
    message.react("😤");
  }
};
