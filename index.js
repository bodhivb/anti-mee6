require("dotenv").config();
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  const statusInterval = setInterval(statusManager.ChangeStatus, 0.5 * 60 * 60 * 1000);
});

bot.on("message", (msg) => {});

bot.login(process.env.TOKEN);
