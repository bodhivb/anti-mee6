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

module.exports = {
    messageLog: [],
    excluded: ["151423248020537345", "151039550234296320", "463855122129223690", "800004055606099979", "799587364346527744"],
    bannedLinks: ["https://discord.com/oauth2/authorize"],
    inviteLinks: ['discord.gg/', 'discordapp.com/invite/'],
    time: (60 * 1000),
    MUTE: undefined, //Assign this to a funcion that can mute based on message object
    MAX: { attachments: 3, messages: 5 },
    MESSAGES: { inviteLink: "Do not send Discord invites in this server", badLink: "That link was banned!", spam: "STOP it, spamming is not allowed, what are you?\nMEE6?!🤬" },
    hasAttachment: function (msg) { return (msg.attachments.size > 0); },
    hasBannedLink: function (msg) {
        return new RegExp(this.bannedLinks.join("|")).test(msg.content);//Improve filtering          
    },
    hasInviteLink: function (msg) {
        return new RegExp(this.inviteLinks.join("|")).test(msg.content);//Improve filtering          
    },
    Message: function (msg) {
        if (this.hasBannedLink(msg)) {
            msg.author.send(this.MESSAGES.badLink)
            msg.delete();
            return;
        }
        if (this.hasInviteLink(msg)) {
            msg.author.send(this.MESSAGES.inviteLink)
            msg.delete();
            return;
        }

        let object = { msg, userid: msg.author.id, hasAttachment: this.hasAttachment(msg) };

        this.messageLog.push(object)
        setTimeout(() => {
            const i = this.messageLog.indexOf(object);
            if (i > -1) {
                this.messageLog.splice(i, 1);
            }
        }, this.time);
        this.CheckLogs();
    },
    CheckLogs: function () {
        let users = [];
        for (let i = 0; i < this.messageLog.length; i++) {
            const msg = this.messageLog[i];
            let user = users.find(u => { return u.id == msg.id; });
            if (this.excluded.includes(user.id)) return; //Ignore excluded
            if (user) {
                user.count++;
                if (this.hasAttachment(msg.msg))
                    newUser.attachments++;

                if (user.count >= this.MAX.messages || user.attachments >= this.MAX.attachments) {
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
                    attachments: 0
                };
                if (this.hasAttachment(msg.msg))
                    newUser.attachments = 1;

                users.push(newUser);
            }
        }
    },
    KICK: function (msg) {
        const member = msg.guild.members.fetch(msg.author.id);
        member.kick();
    }
}