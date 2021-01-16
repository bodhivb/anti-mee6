module.exports.config = {
  name: "say",
};

module.exports.run = async (bot, message, args) => {
  message.delete();
  message.channel.send(args.join(" "));
};
