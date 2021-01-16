module.exports.config = {
  name: "ping",
};

module.exports.run = async (bot, message, args) => {
  message.channel.send("Pong!");
};
