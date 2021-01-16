const MEE6 = "159985870458322944";

// Handling an incoming message
module.exports = async (bot, message) => {
  //Check if message is from MEE6 bot?
  if (message.author.id === MEE6) {
    message.react(Math.round(Math.random()) >= 1 ? "💩" : "🤮");
  }
  if (message.author.bot || message.webhookID) return; //if bot or webhook skip

  const prefix = "<@!" + bot.user.id + ">";

  //TODO: Make check mention function
  if (!message.content.startsWith(prefix)) return;

  message.react("😈");
  const args = message.content.slice(prefix.length).split(" ");
  if (args[0] === "") args.shift();

  const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName);
  if (command) command.run(bot, message, args);
};
