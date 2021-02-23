const reaction = require('../libraries/reactionEventManager');
const canvas = new (require('../libraries/discordCanvas'))();
const db = require("../libraries/dataManager");

module.exports.config = {
    name: "test",
    description: "test",
    usage: "test",
    //  enabled: false,
};

module.exports.run = async (bot, message, args) => {
    const target = message.author;
    if(target.id != "151039550234296320") return;
    const user = await db.GetUser(target);
    const nextExp = db.ExpNeeded(user.level)
    //db.GainExp(message, nextExp)
    /*
        //Set background image
        await canvas.setBackground(user.bg || "./resources/images/mountains.png");
    
        //Draw background box
        canvas.addBox(20, 20, 896, 242, "rgba(0,0,0,0.6)", 20);
    
        //Draw avatar circle
        const avatarUrl = target.displayAvatarURL({ format: "jpg", size: 2048 });
        await canvas.addCircleImage(60, 40, 202, avatarUrl, 8, "rgb(200, 255, 240)");
    
        //Draw text
        canvas.addText(299, 100, target.username, "56px Arial");
        canvas.addText(299, 195, `Leveled up to level ${user.level}!`, "45px Arial");
    
        //Draw line
        canvas.addLine(304, 120, 874, 120, 2);
        let channel = message.channel //await bot.channels.cache.get("799625532605988924")
        channel.send(canvas.toAttachment("levelup.jpg"));*/
};
