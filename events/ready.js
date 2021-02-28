const { Guilds } = require("../libraries/constants");

module.exports = async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);

  //Set bot activity
  const statusManager = require("../triggers/statusManager")(bot);

  statusManager.ChangeStatus();
  setInterval(() => statusManager.ChangeStatus(), 0.5 * 60 * 60 * 1000);

  //Initialize member join tracking invites
  bot.guildInvites = await bot.guilds.cache.get(Guilds.ANTIMEE6).fetchInvites();
};
