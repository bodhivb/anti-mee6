const Discord = require('discord.js');
const client = new Discord.Client();
const statusManager = require('./status-manager')(client);
require('dotenv').config();
const Mee6 = "159985870458322944"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const statusInterval = setinterval(statusManager.ChangeStatus, .5 * 60 * 60 * 1000)
});

client.on('message', msg => {
  if (msg.author.id === Mee6) {

    if (Math.round(Math.random()) >= 1)
      msg.react('💩');
    else msg.react('🤮')
  }
});

client.login(process.env.TOKEN);