const get = require("simple-get");
const db = require("../libraries/dataManager");
module.exports.config = {
    name: "background",
    description: "change background image",
    usage: "background {image url}",
    aliases: ["bg"],
};

module.exports.run = async (bot, message, args) => {
    const url = args[0];
    const validUrl = await IsImage(url);
    if (validUrl) {
        db.ChangeBackground(message, url)
        message.channel.send({
            embed: {
                title: "background changed", "footer": {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: message.member.displayName
                }, color: 3447003, thumbnail: { url }
            }/*, content: `${message.author}` */
        })
        message.delete();
    } else {
        message.reply("invalid url")
    }
};



function IsImage(url) {
    return new Promise(async (resolve) => {
        try {
            get(url, function (err, response) {
                if (err) resolve(false);
                //check headers for image
                if (!(response.headers['content-type']).match(/(image)+\//g)) resolve(false)
                try {
                    if (((response.headers['content-type']).match(/(image)+\//g)).length != 0)
                        resolve(true);
                } catch (error) {
                    resolve(false);
                }
            })
        } catch (error) {
            resolve(false)
        }
    })
}