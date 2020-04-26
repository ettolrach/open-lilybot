require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

client.commands = new Discord.Collection()
client.loader = require('./modules/Loader')
client.config = require("./config.json")

const init = async () => {
    console.clear()
    const loader = client.loader
    await loader.registerModules(client)
    await loader.registerCommands(client)
    await loader.registerEvents(client)
    await loader.checkDiscordStatus(client)
    await client.login(process.env.TOKEN);
}

init()