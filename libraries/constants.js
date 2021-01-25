module.exports.Users = {};

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

module.exports.Colors = Object.freeze({ BLUE: "#62d0f6" });

module.exports.toMention = (value) => "<@" + value + ">";
