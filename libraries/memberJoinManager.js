const joinedUsers = {
    users: [],
    time: (5 * 60 * 1000),
    addUser: function (user, msg) {
        const userObj = { user, msg }
        this.users.push(userObj);

        setTimeout(() => {
            const i = this.users.indexOf(userObj);
            if (i > -1)
                this.users.splice(i, 1);
        }, this.time);
    },
    getUser: function (userid) {
        const user = this.users.find(u => { return u.user === userid });
        if (user) {
            user.msg.delete();
            const i = this.users.indexOf(user);
            if (i > -1)
                this.users.splice(i, 1);
        }
    }
}
module.exports = joinedUsers;