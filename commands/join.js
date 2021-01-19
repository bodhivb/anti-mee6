module.exports.config = {
    name: "join",
    description: "Join discord server",
    usage: "join",
};

module.exports.run = async (bot, message, args) => {
    message.author.send(`https://discord.gg/kug6JDqAhK`).then(() => {
        message.react('✉');
    })
};
