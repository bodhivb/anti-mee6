//member join
const MEE6 = "159985870458322944";
const guildID = "799590946475999282";
const HateroleID = "799593265178738788";
module.exports = async (bot, member) => {
    const guild = member.guild;

    if (guild.id === guildID && member.id === MEE6) {
        member.roles.set([HateroleID]);
        setTimeout(() => { member.roles.set([HateroleID]); }, 5 * 1000)//wait 5 secs to do again
    }
};
