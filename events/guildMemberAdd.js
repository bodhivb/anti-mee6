//member join
const MEE6 = "159985870458322944";
const guildID = "799590946475999282";
const HateroleID = "799593265178738788";
module.exports = async (bot, memberJoin) => {
    memberJoin = JSON.parse(JSON.stringify(memberJoin));
    if (memberJoin.guildID == guildID) {
        const guild = bot.guilds.cache.get(memberJoin.guildID);
        const member = guild.members.cache.get(MEE6);
        //if MEE6
        if (member.user.id == MEE6) {
            member.roles.set([HateroleID]);
        }
    }
};