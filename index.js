require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Loads each command in "commands" folder
console.log("Loading commands...");
try {
  fs.readdirSync("./commands/").forEach((file) => {
    //Only js code may be loaded
    if (!file.endsWith(".js")) return;

    const command = require(`./commands/${file}`);
    const commandName = command.config.name;
    bot.commands.set(commandName, command);
    console.log(`Loaded command ${commandName} (${file})`);
  });
} catch (err) {
  console.log(`Error while loading commands. ${err}`);
}

// Loads each event in "events" folder
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
