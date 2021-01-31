//Dungeon commands

const dungeon = require("../libraries/dungeon");

module.exports.config = {
  name: "daily",
  description: "Daily reward",
  usage: "daily",
  admin: false,
};

module.exports.run = async (bot, message, args) => {
  try {
    const res = await dungeon.DailyBonus(message);
    message.channel.send({
      embed: {
        title: "Daily reward",
        color: "#62D0F6",
        description: `You got daily reward of 100 gold! You now have ${res.gold} gold`,
      },
    });
  } catch (ex) {
    const hour = Math.ceil(ex.cooldown / (1000 * 60 * 60));

    message.channel.send({
      embed: {
        title: "Cooldown!",
        color: "#62D0F6",
        description: "You have already claimed your daily rewards. Wait `" + hour + "h`",
      },
    });
  }
};
