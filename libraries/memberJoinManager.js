const joinedUsers = {
    users: [],
    time: 5 * 60 * 1000,
    addUser: function (user, msg) {
        this.users.push({ user, msg });

        setTimeout(() => {
            const i = this.users.indexOf({ user, msg });
            if (i > -1)
                this.users.splice(i, 1);
        }, this.time);
    },
    getUser: function (userid) {
        const user = this.users.find(u => { return u === userid });
        if (user) {
            user.msg.delete();
            this.users.remove(user);
        }
    }
}
module.exports = joinedUsers;