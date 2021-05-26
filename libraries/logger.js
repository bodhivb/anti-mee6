const gGreen = "\x1b[32m";
const util = require("util");

module.exports = (bot) => {
  var loggerTime;
  var loggerMessage = "```";

  process.on("uncaughtException", (err) => {
    console.error(err);
  });

  console.log = function () {
    const message = util.format.apply(null, arguments) + "\n";
    process.stdout.write(message);
    loggerMessage += message;
    SendTimeOut();
  };

  console.error = function () {
    const message = util.format.apply(null, arguments) + "\n";
    process.stdout.write(`\x1b[31m${message}\x1b[0m`);
    loggerMessage += message;
    SendTimeOut();
  };

  async function SendTimeOut() {
    if (loggerTime) {
      clearTimeout(loggerTime);
      loggerTime = null;
    }

    loggerTime = setTimeout(async () => {
      try {
        await (await bot.channels.cache.get("800467462420168714")).send(
          loggerMessage + "```"
        );
      } catch { }
      loggerMessage = "```";
    }, 1000);
  }
};