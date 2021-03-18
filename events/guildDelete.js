const GuildList = require("../libraries/GuildList")

module.exports = async (bot, guild) => {
    GuildList.Delete(bot, guild);
}