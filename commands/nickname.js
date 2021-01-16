const MEE6 = "159985870458322944";
module.exports.config = {
    name: "nickname",
    usage: 'nickname [nickname]'
};

module.exports.run = async (bot, message, args) => {
    //console.log(message.guild);
    if (args.length < 1) return;
    let member = await message.guild.members.fetch(MEE6);
    member.setNickname(args.join(' ')).then(() => {

        message.react('👿')
    }).catch(err => {
        message.react('😤');
    });
};
