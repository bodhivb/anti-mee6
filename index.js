require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

console.log("Loading events...");
try {
  fs.readdirSync("./events/").forEach((file) => {
    const event = require(`./events/${file}`);
    const eventName = file.substr(0, file.indexOf("."));
    bot.on(eventName, event.bind(null, bot));
    console.log(`Loaded event ${eventName} (${file})`);
  });
} catch (err) {
  console.log(`Error while loading events. ${err}`);
}

// Start bot
bot.login(process.env.TOKEN);
