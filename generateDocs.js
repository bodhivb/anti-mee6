//File To generate static things based onother things (like docs for commands)
const fs = require("fs");
require("dotenv").config();
const func = require("./libraries/functions");

//run when launched, add Functions calls here if more needs to be added.
(async () => {
    const text = await GenerateCommandList();
    fs.writeFileSync("./commands.md", text);


    process.exit(0);
})()

async function GenerateReadme() {
    return new Promise(async resolve => {
        const commands = await GenerateCommandList();
        fs.writeFileSync("./COMMANDS.md", text);


        resolve();
    })
}

function GenerateCommandList() {
    return new Promise(resolve => {
        let text = "## Commands\n\n"

        fs.readdirSync("./commands/").forEach((file) => {
            //Only js code may be loaded
            if (!file.endsWith(".js")) return;
            let command = require(`./commands/${file}`).config;
            command = func.MakeValid(command , func.baseCommand);
            if (command.enabled && !command.admin) {
                console.log(`Command found: ${command.name} (${file})`);
                text += `#### ${command.name}  \n${command.description}  \nUsage: \`@Anti-MEE6#5212 ${command.usage}\`  \n`
            }
        });

        console.log(`Commands written`)
        resolve(text)
    })
}