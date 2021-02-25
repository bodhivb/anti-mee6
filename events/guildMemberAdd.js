const { Bots, Guilds } = require("../libraries/constants");
const canvas = new (require('../libraries/discordCanvas'))();
const db = require("../libraries/dataManager");
const userManager = require("../libraries/memberJoinManager");

//ANTI-MEE6 hate role
const HateroleID = "799593265178738788";

module.exports = async (bot, member) => {
  const guild = member.guild;

  if (guild.id === Guilds.ANTIMEE6 && member.id === Bots.MEE6) {
    member.roles.set([HateroleID]);
    //wait 5 secs to do again
    setTimeout(() => { member.roles.set([HateroleID]); }, 5 * 1000);
  } else if (guild.id === Guilds.ANTIMEE6) {
    const userOb = await bot.users.fetch(member.id);
    const user = await db.GetUser(userOb);

    //Set background image
    await canvas.setBackground(user.bg || "./resources/images/mountains.png");

    //Draw background box
    canvas.addBox(20, 20, 896, 242, "rgba(0,0,0,0.6)", 20);

    //Draw avatar circle
    const avatarUrl = userOb.displayAvatarURL({ format: "jpg", size: 2048 });
    await canvas.addCircleImage(60, 40, 202, avatarUrl, 8, "rgb(200, 255, 240)");

    //Draw text
    canvas.addText(299, 100, userOb.username, "56px Arial");
    canvas.addText(299, 195, "Joined the server!", "45px Arial");

    //Draw line
    canvas.addLine(304, 120, 874, 120, 2);
    let channel = await bot.channels.cache.get("799625532605988924")
    const msg = await channel.send(canvas.toAttachment("join.jpg"));
    console.log(msg);
    userManager.addUser(member.id, msg);
  }
};
