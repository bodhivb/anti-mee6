//Dungeon commands

const db = require("../libraries/dungeon");

module.exports.config = {
  name: "daily",
  description: "Daily bonus",
  usage: "daily",
  admin: false,
};

module.exports.run = async (bot, message, args) => {
  try {
    const res = await db.DailyBonus(message);
    message.channel.send({
      embed: {
        title: "Daily bonus!",
        color: "#62D0F6",
        description: `You got 100 gold! Current gold is: ${res.gold} `,
      },
    });
  } catch {
    message.channel.send({
      embed: {
        title: "Cooldown!",
        color: "#62D0F6",
        description: "You must wait a day unit you can get bonus",
      },
    });
  }
};
