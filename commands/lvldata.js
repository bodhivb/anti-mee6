const db = require('../libraries/dataManager');
module.exports.config = {
    name: "lvldata",
};

module.exports.run = async (bot, message, args) => {
    const doc = await db.GetUser(message.author);
    message.reply(`ID: ${doc.id} lvl: ${doc.level} exp: ${doc.exp}`);
};
