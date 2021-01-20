const db = require("../libraries/dataManager");
const Discord = require("discord.js");

const MEE6 = "<@159985870458322944>";

module.exports.config = {
  name: "votekick",
  description: "Start vote to kick MEE6",
  usage: "votekick",
};

module.exports.run = async (bot, message, args) => {
  if ((await db.GetUser(message.author)).admin) {
    //Set target
    const target = message.mentions.users.first()
      ? message.mentions.users.first()
      : getUserFromMention(bot, MEE6);

    //Show vote embed
    let embed = new Discord.MessageEmbed().setTitle("Vote kick");
    embed.setColor("#0099ff");
    embed.setDescription(
      `The voting kick has been started on ${target}. Press emoji to vote.`
    );
    embed.setThumbnail(target.displayAvatarURL({ dynamic: true }));
    embed.addFields({ name: `✅ Accepted (0)`, value: "|", inline: true });
    embed.addFields({ name: "❌ Declined (0)", value: "|", inline: true });

    const msg = await message.channel.send(embed);
    await msg.react("✅");
    await msg.react("❌");
    let accepted = [];
    let declined = [];

    //Start vote
    const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name);
    const collector = msg.createReactionCollector(filter, { dispose: true, time: 15000 });

    //Add emoji
    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "✅") {
        accepted.push(user);
        embed.fields[0].name = `✅ Accepted (${accepted.length})`;
        embed.fields[0].value = accepted.map((u) => `| ${u} \n`);
      } else {
        declined.push(user);
        embed.fields[1].name = `❌ Declined (${declined.length})`;
        embed.fields[1].value = declined.map((u) => `| ${u} \n`);
      }
      msg.edit(embed);
    });

    //Remove emoji
    collector.on("remove", (reaction, user) => {
      if (reaction.emoji.name === "✅") {
        accepted.splice(accepted.indexOf(user), 1);
        embed.fields[0].name = `✅ Accepted (${accepted.length})`;
        if (accepted.length > 0) {
          embed.fields[0].value = accepted.map((u) => `| ${u} \n`);
        } else {
          embed.fields[0].value = "|";
        }
      } else {
        declined.splice(accepted.indexOf(user), 1);
        embed.fields[1].name = `❌ Declined (${declined.length})`;
        if (declined.length > 0) {
          embed.fields[1].value = declined.map((u) => `| ${u} \n`);
        } else {
          embed.fields[1].value = "|";
        }
      }
      msg.edit(embed);
    });

    //End vote
    collector.on("end", (collected) => {
      const isKick = accepted.length > declined.length;
      embed.addField(
        "⏱️ Timer is over",
        "Time has passed and the team has decided to " +
          (isKick
            ? `**kick** ${target} off the server`
            : `**keep** ${target} on the server`)
      );
      msg.edit(embed);

      if (isKick) {
        //Kick target
        try {
          const member = message.guild.members.resolve(target);
          member.kick();
        } catch {
          message.channel.send(`Error with permissions to kick ${target} :(`);
        }
      }
    });
  } else {
    message.reply(
      "These commands are still under development and can only be used by the developer now"
    );
  }
};

function getUserFromMention(bot, mention) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return bot.users.cache.get(mention);
  }
}
