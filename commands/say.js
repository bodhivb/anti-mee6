module.exports.config = {
  name: "say",
  description: "Make the bot say a message",
  usage: "say {message}",
  admin: true,
};

module.exports.run = async (bot, message, args) => {
  message.delete();
  message.channel.send(args.join(" "));
};
