const gGreen = "\x1b[32m";
module.exports = (bot) => {
  var loggerTime;
  var loggerMessage = "```";

  process.on('uncaughtException', (err) => {
    console.error(err);
  })

  console.log = function (message) {
    if (typeof message === "object") //if error message
      if ('stack' in message) message = message.stack;
      else
        message = JSON.stringify(message, null, 2);

    process.stdout.write(message + "\n");

    loggerMessage += message + "\n";
    SendTimeOut();
  };

  console.error = function (message) {
    if ('stack' in message) message = message.stack; //if error message

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
      } catch { }
      loggerMessage = "```";
    }, 1000);
  }
};