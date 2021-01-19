
module.exports = (bot, msg, newMsg, max = 1, time = 30000) => {
    return new Promise(async (resolve, reject) => {
        const message = await msg.channel.send(newMsg);
        message.awaitReactions((reaction, user) => user.id == msg.author.id, { max, time, errors: ["time"] })
            .then(reactions => {
                resolve({ reactions, message });
            })
    })
}