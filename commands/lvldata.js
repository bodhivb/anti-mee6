const db = require('../libraries/dataManager');
module.exports.config = {
    name: "lvldata",
    description: "Test message to show exp and level",
    usage: "lvldata",
};

module.exports.run = async (bot, message, args) => {
    const doc = await db.GetUser(message.author);
    message.reply(`ID: ${doc.id} lvl: ${doc.level} exp: ${doc.exp} admin: ${doc.admin}`);
};
