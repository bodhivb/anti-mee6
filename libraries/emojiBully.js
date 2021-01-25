const db = require('../libraries/dataManager');
const hateEmoji = "<:hatemee6:799626808731238410>";

module.exports = async (bot, message) => {

    await message.react(hateEmoji);
    //Start vote
    const filter = (reaction, user) => "hatemee6" == reaction.emoji.name;
    const collector = message.createReactionCollector(filter, { dispose: true, time: 15000 });

    let voted = [];

    //Add emoji
    collector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === "hatemee6") {
            voted.push(user);
        }
    });

    //Remove emoji
    collector.on("remove", (reaction, user) => {
        if (reaction.emoji.name === "hatemee6") {
            voted.splice(voted.indexOf(user), 1);
        }
    });

    collector.on("end", (collected) => {
        message.react('❌')
        for (let i = 0; i < voted.length; i++) {
            const user = voted[i];
            db.GainExp(message, 1, user);
        }
        message.channel.send({ embed: { title: `bullying ended`, color: "#62D0F6", description: `[message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}) - voters: ` + voted.join(', ') } })
    });
}