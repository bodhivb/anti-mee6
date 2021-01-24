const express = require('express')
const helmet = require("helmet");
const cors = require('cors');
const app = express()

const port = 4466

app.set('view engine', 'ejs');
app.set('trust proxy', 1)
app.use(helmet());
app.use(cors());
app.use('/resources', express.static('resources'));

module.exports = (bot) => {
    const commands = bot.commands.map(command => { return command.config; });
    
    app.get('/', async (req, res) => {
        const avatar = bot.user.displayAvatarURL({ format: "jpg", size: 256 });
        res.render('index', { commands, avatar });
    })

    app.listen(port, () => {
        console.log(`website was loaded (http://localhost:${port})`)
    })
}