const Canvas = require("canvas");
const Discord = require("discord.js");

module.exports.config = {
  name: "rank",
  description: "Show your rank status",
  usage: "rank",
};

module.exports.run = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(936, 282);
  const context = canvas.getContext("2d");

  const background = await Canvas.loadImage("./resources/images/triangles.png");
  context.drawImage(
    background,
    0,
    0,
    canvas.width,
    (background.width * canvas.height) / background.height
  );

  //Start draw circle clip
  context.save();
  context.beginPath();
  context.arc(141, 141, 101, 0, 2 * Math.PI, false);
  context.clip();
  //Apply avatar
  const avatar = await Canvas.loadImage(
    message.member.user.displayAvatarURL({ format: "jpg", size: 2048 })
  );
  context.drawImage(avatar, 40, 40, 202, 202);
  context.restore();
  //End circle clip

  //Apply text
  Canvas.registerFont("./resources/fonts/arial.ttf", { family: "Arial" });
  context.font = "52px Arial";
  context.fillStyle = "white";
  context.fillText(message.member.displayName, 282, 100);
  context.fillText("____________________", 284, 120);
  context.font = "32px Arial";
  context.fillText("Level 1", 284, 180);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "rank.jpg");

  message.channel.send(attachment);
};
