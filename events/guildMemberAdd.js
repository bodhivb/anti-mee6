//member join
const MEE6 = "159985870458322944";
const guildID = "799590946475999282";
const HateroleID = "799593265178738788";
module.exports = async (bot, memberJoin) => {
    memberJoin = JSON.parse(JSON.stringify(memberJoin));
    console.log("1")
    if (memberJoin.guildID == guildID) {
        console.log("2")
        const guild = await bot.guilds.cache.get(memberJoin.guildID);
        const member = await guild.members.cache.get(MEE6);
        console.log("3")
        //if MEE6
        console.log(JSON.stringify(memberJoin))
        console.log(JSON.stringify(member))
       // if (member.user.id == MEE6) {
            const guildMember = await guild.members.cache.get(MEE6);
            guildMember.roles.set([HateroleID]);
            console.log("4")
       // }
    }
};