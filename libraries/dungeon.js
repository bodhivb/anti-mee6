const monk = require("monk");
const db = monk(process.env.MONGODB_URI);

db.then(() => {
  console.log("Connected correctly to dungeon database.");
});

const dungeonUsers = db.get("dungeonUsers");
dungeonUsers.createIndex(["id", "gold", "lastDailyReward"]);

const GetUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    if (user.bot) reject({ reason: "User is a bot" });
    const created = await dungeonUsers.findOne({ id: user.id });
    if (!created) {
      dungeonUsers.insert({ id: user.id, gold: 0 }).then((doc) => {
        resolve(doc);
      });
    } else {
      resolve(created);
    }
  });
};
module.exports.GetUser = GetUser;

const DailyBonus = async (message) => {
  return new Promise(async (resolve, reject) => {
    const user = await this.GetUser(message.author);

    if (user.lastDailyReward) {
      const availableDate = new Date(user.lastDailyReward);
      //Add a day
      availableDate.setDate(availableDate.getDate() + 1);

      if (new Date() < availableDate) {
        return reject({ reason: "Cooldown, pleae wait next day" });
      }
    }

    resolve(
      await dungeonUsers.findOneAndUpdate(
        { id: user.id },
        { $inc: { gold: 100 }, $set: { lastDailyReward: new Date() } }
      )
    );
  });
};
module.exports.DailyBonus = DailyBonus;
