const { Bots, Guilds } = require("../libraries/constants");

//ANTI-MEE6 hate role
const HateroleID = "799593265178738788";

module.exports = async (bot, member) => {
  const guild = member.guild;

  if (guild.id === Guilds.ANTIMEE6 && member.id === Bots.MEE6) {
    member.roles.set([HateroleID]);
    //wait 5 secs to do again
    setTimeout(() => { member.roles.set([HateroleID]); }, 5 * 1000); 
  }
};
