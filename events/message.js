const MEE6 = "159985870458322944";
const emoji = ["💩", "🤮", "🤢"];

// Handling an incoming message
module.exports = async (bot, message) => {
  //Check if message is from MEE6 bot?
  if (message.author.id === MEE6) {
    message.react(RandomEmoji());
  }
  if (message.author.bot || message.webhookID) return; //if bot or webhook skip

  const mention = "<@!" + bot.user.id + ">";
  const prefix = "?";

  //TODO: Make check mention function
  if (!message.content.startsWith(prefix) && !message.content.startsWith(mention)) return;
  const length = message.content.startsWith(prefix) ? prefix.length : mention.length;

  const args = message.content.slice(length).split(" ");
  if (args[0] === "") args.shift();
  if (args.length < 1) return;

  const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName);
  if (command) command.run(bot, message, args);
};

function RandomEmoji() {
  return emoji[Math.floor(Math.random() * emoji.length)];
}
