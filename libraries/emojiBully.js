const db = require("../libraries/dataManager");
const { Emojis } = require("./constants");

module.exports = async (bot, message) => {
    await message.react(Emojis.HATE);

    //Start vote
    const filter = (reaction, user) => "hatemee6" == reaction.emoji.name;
    const collector = message.createReactionCollector(filter, { dispose: true, time: 15000 });

    let voted = [];

    //Add emoji
    collector.on("collect", (reaction, user) => {
        if (user.bot) return;
        if (reaction.emoji.name === "hatemee6") {
            voted.push(user);
        }
    });

    //Remove emoji
    collector.on("remove", (reaction, user) => {
        if (user.bot) return;
        if (reaction.emoji.name === "hatemee6") {
            voted.splice(voted.indexOf(user), 1);
        }
    });

    collector.on("end", (collected) => {
        message.react('❌');
        if (voted.length < 1) return;
        for (let i = 0; i < voted.length; i++) {
            const user = voted[i];
            db.GainExp(message, 1, user);
        }
        message.channel.send({ embed: { title: `bullying ended`, color: "#62D0F6", description: `[message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}) - voters: ` + voted.join(', ') } })
    });
}