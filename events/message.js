const emoji = ["💩", "🤮", "🤢"];
const { Bots, Guilds } = require("../libraries/constants");
const emojiBully = require("../triggers/emojiBully");
const Spam = require("../libraries/spam");

// Handling an incoming message
module.exports = async (bot, message) => {
  //Check if message is from MEE6 bot?
  if (message.author.id === Bots.MEE6) {
    message.react(RandomEmoji());
    const drop = Math.floor(Math.random() * 2)  //change number to change rate (2= 1/2; 3 = 1/3 etc)
    if (drop == 0) {
      emojiBully(bot, message);
    }
  } //else if (message.content.toLowerCase().includes('mee6 '))emojiBully(bot, message); //bully people who say mee6 (disabled for now)
  if (message.author.bot || message.webhookID) return; //if bot or webhook skip

  const mention = "<@!" + bot.user.id + ">";
  const prefix = "?";

  //Check for spam 
  if (message.guild.id == Guilds.ANTIMEE6)
    Spam.Message(message);


  //TODO: Make check mention function
  if (!message.content.startsWith(prefix) && !message.content.startsWith(mention)) return;
  const length = message.content.startsWith(prefix) ? prefix.length : mention.length;

  const args = message.content.slice(length).split(" ");
  if (args[0] === "") args.shift();
  if (args.length < 1) return;

  const commandName = args.shift().toLowerCase();
  const command =
    bot.commands.get(commandName) ||
    bot.commands.find((c) => c.config.aliases && c.config.aliases.includes(commandName));

  if (command) command.run(bot, message, args);
};

function RandomEmoji() {
  return emoji[Math.floor(Math.random() * emoji.length)];
}
