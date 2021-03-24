/*
SPAM DETECTION

- Mute if:
5 messages in 1 minute

- Delete message if:
3 attachment messages in 1 minute
server invites
bot link

- Kick if:

TODO: 
Maybe a way to exclude image channels from attachment limit

*/

class Spam {
    static messageLog = []
    static excluded = ["151423248020537345", "151039550234296320", "463855122129223690", "800004055606099979", "799587364346527744"]
    static bannedLinks = ["https://discord.com/oauth2/authorize"]
    static inviteLinks = ['discord.gg/', 'discordapp.com/invite/']
    static time = (5 * 1000)
    static MUTE = undefined //Assign this to a funcion that can mute based on message object
    static MAX = { attachments: 3, mentions: 4, messages: 6 }
    static MESSAGES = { inviteLink: "Do not send Discord invites in this server", badLink: "That link was banned!", spam: "STOP it, spamming is not allowed, what are you?\nMEE6?!🤬" }
    static EnableExcluded = false
    static hasAttachment(msg) { return (msg.attachments.size > 0); }
    static hasMention(msg) { return (msg.mentions.members.size > 0 || msg.mentions.roles.size > 0 || msg.mentions.everyone); }
    static hasBannedLink(msg) {
        return new RegExp(Spam.bannedLinks.join("|")).test(msg.content);//Improve filtering          
    }
    static hasInviteLink(msg) {
        return new RegExp(Spam.inviteLinks.join("|")).test(msg.content);//Improve filtering          
    }
    static Message(msg) {
        if (Spam.excluded.includes(msg.author.id) && Spam.EnableExcluded)
            return; //Ignore excluded


        if (Spam.hasBannedLink(msg)) {
            msg.author.send(Spam.MESSAGES.badLink)
            msg.delete();
            return;
        }
        if (Spam.hasInviteLink(msg)) {
            msg.author.send(Spam.MESSAGES.inviteLink)
            msg.delete();
            return;
        }

        let object = { msg, userid: msg.author.id, hasAttachment: Spam.hasAttachment(msg) };

        Spam.messageLog.push(object)
        setTimeout(() => {
            const i = Spam.messageLog.indexOf(object);
            if (i > -1) {
                Spam.messageLog.splice(i, 1);
            }
        }, Spam.time);
        Spam.CheckLogs();
    }
    static CheckLogs () {
        let users = [];
        for (let i = 0; i < Spam.messageLog.length; i++) {
            const msg = Spam.messageLog[i];
            let user = users.find(u => { return u.id == msg.id; });        
            if (user) {
                user.count++;
                if (Spam.hasAttachment(msg.msg))
                    user.attachments++;
                if (Spam.hasMention(msg.msg))
                    user.mentions++;

                if (Spam.ExceededLimits(user)) {
                    try {
                        MUTE(msg.msg);
                    } catch (error) {
                        //throw new Error('Mute function not defined');//comment away to continue running 
                        console.log("No MUTE function defined for spam library.");
                    }
                }
            } else {
                let newUser = {
                    id: msg.id,
                    count: 1,
                    attachments: 0,
                    mentions: 0
                };
                if (Spam.hasAttachment(msg.msg))
                    newUser.attachments = 1;
                if (Spam.hasMention(msg.msg))
                    newUser.mentions = 1;

                users.push(newUser);
            }
        }
    }

    static ExceededLimits(user) {
        const exceeded = []
        exceeded.push(user.count >= Spam.MAX.messages); // message limit
        exceeded.push(user.attachments >= Spam.MAX.attachments); // attachment limit
        exceeded.push(user.mentions >= Spam.MAX.mentions); // mention limit
        return exceeded.includes(true)
    }

    static KICK(msg) {
        const member = msg.guild.members.fetch(msg.author.id);
        member.kick();
    }
}
module.exports = Spam;