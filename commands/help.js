module.exports.config = {
    name: "help",
    usage: "help {command}"
};

module.exports.run = async (bot, message, args) => {
    let helpMessages = []
    bot.commands.forEach((key, value) => {
        helpMessages.push(key.config.name);
    });
    //`\` @${bot.user.displayName}#${bot.user.discriminator}` + helpMessages.join("`, `") + "`" //voor usage enzo
    message.channel.send({
        embed: {
            title: "Help",
            description: "`" + helpMessages.join("`, `") + "`",
        }
    });
};
