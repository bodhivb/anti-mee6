const prefix = ".";
const Mee6 = "159985870458322944";

// Handling an incoming message
module.exports = async (bot, message) => {
  //Check if message is from MEE6 bot?
  if (message.author.id === Mee6) {
    message.react(Math.round(Math.random()) >= 1 ? "💩" : "🤮");
  }

  //TODO: Make check mention function
  if (
    (!message.content.startsWith(prefix) &&
      !message.content.startsWith("<@!" + bot.user.id + ">")) ||
    message.author.bot
  )
    return;

  message.react("😈");
  const args = message.content.slice(prefix.length + 1).split(" ");
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName);
  if (command) command.run(bot, message, args);
};
