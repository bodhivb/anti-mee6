module.exports = (bot) => {
  var loggerTime;
  var loggerMessage = "```";

  console.log = function (message) {
    process.stdout.write(message + "\n");
    loggerMessage += message + "\n";
    SendTimeOut();
  };

  console.error = function (message) {
    process.stdout.write(message + "\n");
    loggerMessage += message + "\n";
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
      } catch {}
      loggerMessage = "```";
    }, 1000);
  }
};
