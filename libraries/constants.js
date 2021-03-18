module.exports.Users = Object.freeze({
  BODHI: "151423248020537345",
  RICK: "151039550234296320"
});

module.exports.Bots = Object.freeze({
  ANTIMEE6: "799587364346527744",
  MEE6: "159985870458322944",
});

module.exports.Guilds = Object.freeze({
  ANTIMEE6: "799590946475999282",
});

module.exports.Invites = Object.freeze({
  ANTIMEE6:
    "https://discord.com/oauth2/authorize?scope=bot&client_id=799587364346527744&permissions=8",
  MEE6:
    "https://discord.com/oauth2/authorize?scope=bot&client_id=159985415099514880&guild_id=799590946475999282",
});

module.exports.Emojis = Object.freeze({
  HATE: "<:hatemee6:799626808731238410>",
});

module.exports.Channels = Object.freeze({
  HALLOFFAME: "822092074778099794"
});

module.exports.Colors = Object.freeze({ BLUE: "#62d0f6" });

module.exports.toMention = (value) => "<@" + value + ">";


class StaticObjects{
  static Guilds = {};
  static Channels = {};

}

module.exports.StaticObjects = StaticObjects;