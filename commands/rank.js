const Canvas = require("../libraries/discordCanvas");
const db = require("../libraries/dataManager");

module.exports.config = {
  name: "rank",
  description: "Show your rank status",
  usage: "rank",
  aliases: ["me", "level"],
};

module.exports.run = async (bot, message, args) => {
  let target = message.mentions.users.first()
    ? message.mentions.users.first()
    : message.author;

  let user;
  let barValue = 0;

  try {
    user = await db.GetUser(target);
    barValue = (100 / db.ExpNeeded(user.level)) * user.exp;
  } catch {
    return message.channel.send("Error while loading user");
  }

  const lineColor = "rgb(200, 255, 240)";
  const barColor = "rgb(76, 86, 138)";

  const canvas = new Canvas();

  //Set background image
  await canvas.setBackground(user.bg || "./resources/images/mountains.png");

  //Draw background box
  canvas.addBox(20, 20, 896, 242, "rgba(0,0,0,0.7)", 20);

  //Draw avatar circle
  const avatarUrl = target.displayAvatarURL({ format: "jpg", size: 2048 });
  await canvas.addCircleImage(60, 40, 202, avatarUrl, 8, lineColor);

  //Draw progress bar
  canvas.addBox(306, 185, 570, 40, barColor, 10, 5, lineColor);
  canvas.addBar(306, 185, 570, 40, 10, lineColor, barValue);

  //Draw text
  canvas.addText(299, 100, target.username, "56px Arial");
  canvas.addText(302, 165, "Level " + user.level, "32px Arial");

  //Draw line
  canvas.addLine(304, 120, 874, 120, 2);

  message.channel.send(canvas.toAttachment("rank.jpg"));
};
