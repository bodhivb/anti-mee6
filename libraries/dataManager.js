const monk = require('monk');
const db = monk(process.env.MONGODB_URI);

function DoesLevelUP(lvl, currentExp, addedExp) {
    const expNeeded = ExpNeeded(lvl);

    let rest = expNeeded - (currentExp + addedExp);

    const obj = {
        lvlup: false,
        newLvl: lvl,
        newExp: currentExp + addedExp,
    }

    if (rest <= 0) {
        //lvlup
        obj.lvlup = true;
        obj.newLvl = lvl + 1;
        obj.newExp = (rest < 0) ? -rest : 0;
    }
    return obj;
}
module.exports.ExpNeeded = function ExpNeeded(lvl) {
    return (lvl * 2) + 10;
}

const users = db.get('users')
users.createIndex(['id', 'lvl'])

db.then(() => {
    console.log('Connected correctly to database.')
})

module.exports.User = users;
module.exports.GetUser = GetUser;
function GetUser(_user) {
    return new Promise(async (resolve, reject) => {
        if (_user.bot) reject({ reason: "User is a bot" })
        const created = await users.findOne({ id: _user.id })
        if (!created) {
            users.insert({ id: _user.id, level: 0, exp: 0 })
                .then((doc) => {
                    doc.admin = doc.admin || false;
                    resolve(doc);
                })
        } else {
            created.admin = created.admin || false;
            resolve(created);
        }
    })
};

module.exports.GainExp = async (_user, exp = 1) => {
    return new Promise(async (resolve, reject) => {
        const user = await GetUser(_user)
        const NewLvl = DoesLevelUP(user.level, user.exp, exp)
        users.findOneAndUpdate({ id: _user.id }, { $set: { level: NewLvl.newLvl, exp: NewLvl.newExp } })
            .then(doc => {
                doc.admin = doc.admin || false;
                resolve({ lvlup: NewLvl.lvlup, doc: doc });
            })
    })
}