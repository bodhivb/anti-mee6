const { Bots } = require("../libraries/constants");
const db = require("../libraries/dataManager");

module.exports.config = {
  name: "nickname",
  usage: "nickname [nickname]",
  description: "Change the nickname of MEE6",
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return;
  let member = await message.guild.members.fetch(Bots.MEE6);
  member
    .setNickname(args.join(" "))
    .then(() => {
      message.react("😈");
      db.GainExp(message, 1);
    })
    .catch((err) => {
      message.react("😤");
    });
};
