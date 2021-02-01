const { db } = require("./dataManager");

const dungeonUsers = db.get("dungeonUsers");
//Schemas -> ["id", "gold", "lastDailyReward"]
dungeonUsers.createIndex(["id"]);

//Available items in dungeon:
// - Weapons
// - Armor and shields
// - Potions?
const dungeonItems = db.get("dungeonItems");
//Schemas -> ["name", "description", "emoji"  "slot", "damage", "speed", "armor", "buy", "sell"]
dungeonItems.createIndex(["name"]);

//Slot
// 2 Hand slots -> 1: hand left (sword) | 2: hand right (shield)
// 3 Armor slots -> 3: helmet | 4: Chestplate | 5: Legging

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

// In future version it should be id instad of name
const GetItem = (name) => dungeonItems.findOne({ name });
module.exports.GetItem = GetItem;

const GetItems = () => dungeonItems.find({});
module.exports.GetItems = GetItems;

const CreateItem = (name) => dungeonItems.insert({ name });
module.exports.CreateItem = CreateItem;

const DeleteItem = (name) => dungeonItems.remove({ name }, { justOne: true });
module.exports.DeleteItem = DeleteItem;

const EditItem = (name, key, value) => {
  let update = {};
  update[key] = value;
  return dungeonItems.findOneAndUpdate({ name }, { $set: update });
};
module.exports.EditItem = EditItem;

const DailyBonus = async (message) => {
  return new Promise(async (resolve, reject) => {
    const user = await this.GetUser(message.author);

    if (user.lastDailyReward) {
      const availableDate = new Date(user.lastDailyReward);
      //Add a day
      availableDate.setDate(availableDate.getDate() + 1);

      if (new Date() < availableDate) {
        return reject({
          reason: "Cooldown, pleae wait next day",
          cooldown: Math.abs(availableDate - new Date()),
        });
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
