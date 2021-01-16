module.exports = async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);

  //Set bot activity
  const statusManager = require("../libraries/statusManager")(bot);

  statusManager.ChangeStatus();
  setInterval(statusManager.ChangeStatus, 0.5 * 60 * 60 * 1000);
};
