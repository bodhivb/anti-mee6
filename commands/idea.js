const get = require('simple-get')
const listId = "6009db9cd754054a79f75d3c"
module.exports.config = {
    name: "idea",
    description: "Add your idea to our trello board",
    usage: "idea {idea}",
};

module.exports.run = async (bot, message, args) => {
    if (args.length < 1) {
        message.reply("Please enter a valid idea")
        return;
    };
    const name = encodeURIComponent(`${message.author.username}#${message.author.discriminator} (${message.author.id})`)
    const card = await PostIdea(encodeURIComponent(args.join(" ")), name);
    message.channel.send({ embed: { title: "Card created", description: `Your card was created, you can find it [here](${card.shortUrl}).\nThe idea is:\n\`${card.name}\`` } });
};

function PostIdea(name, desc) {
    return new Promise(async (resolve) => {
        const opts = {
            method: 'POST',
            url: `https://api.trello.com/1/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&idList=${listId}&pos=top&name=${name}&desc=${desc}`,
            //body: {            },
            json: true
        }
        get.concat(opts, function (err, res, data) {

            resolve(data)
        })
    })
}