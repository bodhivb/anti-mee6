


module.exports = (bot) => {
    return new Promise((resolve) => {
        let stats = { guilds: bot.guilds.cache.size || 'nan', users: bot.users.cache.size || 'nan', channels: bot.channels.cache.size || 'nan' };
        const uptime = convertMS(bot.uptime);
        stats.uptime = `${(uptime.day > 0) ? uptime.day + " d -" : ""} ${(uptime.hour > 0) ? `${uptime.hour} h -` : ""} ${(uptime.minute > 0) ? `${uptime.minute} m -` : ""} ${(uptime.seconds > 0) ? `${uptime.seconds} s` : ""}`

        resolve(stats);
    })
}



function convertMS(milliseconds) {
    let day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}