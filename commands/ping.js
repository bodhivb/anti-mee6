module.exports.config = {
  name: "ping",
  description:    "ping bot",
  usage: "ping",
};

module.exports.run = async (bot, message, args) => {
  message.channel.send("Pong!");
};
