const reaction = require('../libraries/reactionEventManager');

module.exports.config = {
    name: "test",
    description: "test",
    usage: "test",
};

module.exports.run = async (bot, message, args) => {
    reaction(bot, message, { embed: { title: "test" } }).then(ret => {
        console.log(JSON.stringify(ret));
    })
};
