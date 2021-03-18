require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const Spam = require("./libraries/spam");
const { StaticObjects, Guilds, Channels } = require("./libraries/constants");

const bot = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
bot.commands = new Discord.Collection();

//Added useful functions to bot
require("./libraries/functions")(bot);

//Loads each command in "commands" folder
bot.loadCommands();

require("./libraries/website")(bot); //create website

//automatically get objects we (might) need globally
(async () => {
  StaticObjects.Guilds["ANTIMEE6"] = await bot.guilds.fetch(Guilds.ANTIMEE6);
  StaticObjects.Channels["HALLOFFAME"] = await bot.channels.fetch(Channels.HALLOFFAME);
})()

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
  console.log(err.stack);
}

//set spam function
Spam.MUTE = (msg) => {
  msg.author.send("HEY! Stop spamming!")
}

// Start bot
bot.login(process.env.TOKEN);

//Set custom logger
require("./libraries/logger")(bot);
