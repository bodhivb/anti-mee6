const Canvas = require("canvas");
const db = require("../libraries/dataManager");
const Discord = require("discord.js");

module.exports.config = {
  name: "rank",
  description: "Show your rank status",
  usage: "rank",
};

module.exports.run = async (bot, message, args) => {
  let target = (message.mentions.users.first()) ? message.mentions.users.first() : message.author;
  const user = await db.GetUser(target);
  const barValue = (100 / db.ExpNeeded(user.level)) * user.exp;

  const lineColor = "rgb(200, 255, 240)";
  const barColor = "rgb(76, 86, 138)";
  const canvas = Canvas.createCanvas(936, 282);
  const context = canvas.getContext("2d");

  const background = await Canvas.loadImage(user.bg || "./resources/images/mountains.png");
  context.drawImage(
    background,
    0,
    0,
    canvas.width,
    (background.width * canvas.height) / background.height
  );

  //Draw background box
  drawBox(context, 20, 20, 896, 242, 20, 0, null, "rgba(0,0,0,0.7)");

  //Draw circle avatar
  const avatar = await Canvas.loadImage(
    target.displayAvatarURL({ format: "jpg", size: 2048 })
  );
  drawCircleImage(context, 60, 40, 202, lineColor, avatar);

  //Draw progress bar
  drawBox(context, 306, 185, 570, 40, 10, 5, lineColor, barColor);
  drawBar(context, 306, 185, 570, 40, 10, lineColor, barValue);

  //Apply text
  Canvas.registerFont("./resources/fonts/arial.ttf", { family: "Arial" });
  context.font = "56px Arial";
  context.fillStyle = "white";
  context.fillText(target.username, 299, 100);
  context.font = "32px Arial";
  context.fillStyle = "rgb(253, 255, 247)";
  context.fillText("Level " + user.level, 302, 165);

  //Draw line
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.beginPath();
  context.lineTo(304, 120);
  context.lineTo(874, 120);
  context.stroke();

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rank.jpg");
  message.channel.send(attachment);
};

function drawBox(context, x, y, width, height, radius, lWidth, lColor, color) {
  context.save();
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);

  if (lWidth > 0) {
    context.lineWidth = lWidth;
    context.strokeStyle = lColor;
    context.stroke();
  }
  context.fillStyle = color;
  context.fill();
  context.restore();
}

function drawCircleImage(context, x, y, size, lColor, img) {
  context.save();
  context.beginPath();
  context.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI, false);
  context.lineWidth = 8;
  context.strokeStyle = lColor;
  context.stroke();
  context.clip();
  context.drawImage(img, x, y, size, size);
  context.restore();
}

function drawBar(context, x, y, width, height, radius, color, percentage) {
  context.save();
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.clip();

  context.fillStyle = color;
  context.fillRect(x, y, (width * percentage) / 100, height);
  context.restore();
}
