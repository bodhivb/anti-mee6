const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const Mee6 = "159985870458322944"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author.id === Mee6) {

    if (Math.round(Math.random()) >= 1)
      msg.react('💩');
    else msg.react('🤮')
  }
});

client.login(process.env.TOKEN);