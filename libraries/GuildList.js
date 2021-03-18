const { Guilds, StaticObjects } = require('./constants');
const GeneralNames = ['general', 'chat', 'welcome', 'new'];//common names for a general chat

module.exports = async (bot, guild) => {
    let invite;
    try { //Try make invite (fails if no permission)
        const TextChannels = await guild.channels.cache.filter(x => x.type === 'text');
        const general = TextChannels.find(x => GeneralNames.includes(x.name.toLowerCase()));
        const channel = (general != undefined) ? general : TextChannels.first();
        invite = await channel.createInvite(
            { maxAge: 0, maxUses: 0 },
            `Created for partner in Hall of fame.`
        )
    }
    catch (err) { }//silence error
    finally { //always put message in hall of fame
        const embed = {
            content: guild.id, embed: {
                author: {
                    name: guild.name,
                    url: (invite) ? invite.url : undefined,
                    icon_url: guild.iconURL()
                },
            }
        }
        StaticObjects.Channels.HALLOFFAME.send(embed);
    }
}

module.exports.Delete = async (bot, guild) => {
    const messages = await StaticObjects.Channels.HALLOFFAME.messages.fetch()
    const msg = messages.find(x => x.content == guild.id);
    if (msg) msg.delete(); //delete message if can find
}