const dungeon = require("../libraries/dungeon");

module.exports.config = {
    name: "balance",
    description: "Get dungeon balance",
    usage: "balance",
    aliases: ["bal"],
};

module.exports.run = async (bot, message, args) => {
    const target = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    const res = await dungeon.GetUser(target);
    message.channel.send({
        embed: {
            color: "#62D0F6",
            description: `${(target == message.author) ? "Your" : `${target}'s`} balance is: ${res.gold} gold.`,
        },
    });
}