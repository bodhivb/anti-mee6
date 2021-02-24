//Dungeon commands
const Discord = require("discord.js");
const Canvas = require("../libraries/discordCanvas");
const dungeon = require("../libraries/dungeon");
const db = require("../libraries/dataManager");

module.exports.config = {
  name: "inventory",
  description: "View inventory",
  usage: "inventory",
  admin: false,
  aliases: ["inv"],
};

module.exports.run = async (bot, message, args) => {
  const canvas = new Canvas();
  const author = message.author;
  let dungeonUser, user, barValue;

  try {
    dungeonUser = await dungeon.GetUser(author);
    user = await db.GetUser(author);
    barValue = (100 / db.ExpNeeded(user.level)) * user.exp;
  } catch {
    return message.react("😤");
  }

  const lineColor = "rgb(200, 255, 240)";
  const barColor = "rgb(76, 86, 138)";

  //Set background image
  await canvas.setBackground("./resources/images/inventory_background.jpg");

  //Draw character
  await canvas.addImage(40, 202, 180, 180, "./resources/dungeon/pant.png");
  await canvas.addImage(40, 62, 180, 180, "./resources/dungeon/hand.png");
  await canvas.addImage(40, 62, 180, 180, "./resources/dungeon/armor_1.png");
  await canvas.addImage(40, 62, 180, 180, "./resources/dungeon/handLeft.png");

  //Draw avatar circle
  const avatarUrl = author.displayAvatarURL({ format: "jpg", size: 2048 });
  await canvas.addCircleImage(90, 20, 80, avatarUrl);

  //Draw background progress bar box
  canvas.addBox(15, 237, 250, 30, "rgba(0,0,0,0.7)", 10);

  //Draw progress bar
  canvas.addBox(75, 244, 180, 16, barColor, 5, 2, lineColor);
  canvas.addBar(75, 244, 180, 16, 2, lineColor, barValue);
  canvas.addText(
    25,
    259,
    "Lv. " + (user.level < 10 ? " " : "") + user.level,
    "15px Arial Black"
  );

  //Draw equipment
  canvas.addBox(280, 15, 200, 252, "rgba(0,0,0,0.7)", 10);
  canvas.addText(330, 35, "Equipment", "18px Arial Black");

  //Draw inventory
  canvas.addBox(510, 15, 400, 252, "rgba(0,0,0,0.7)", 10);
  canvas.addText(670, 35, "Inventory", "18px Arial Black");

  if (dungeonUser.inventory) {
    dungeonUser.inventory.forEach((name, i) => {
      canvas.addText(530, 28 * i + 75, name, "18px Arial");
    });
  } else {
    canvas.addText(675, 135, "empty", "16px Arial Black");
  }

  message.channel.send(canvas.toAttachment("inventory.jpg"));
};
