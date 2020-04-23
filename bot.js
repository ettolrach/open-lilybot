// Import different modules.
const Discord = require("discord.js");
const client = new Discord.Client();
// To run bash commands.
const { exec } = require("child_process");
// To access files.
const fs = require("fs");
// Load the configuration.
const config = require("./config.json");

// Read the token and display it. The extra stuff after .toString() is to ensure that only the first line is used, the one which hopefully has the token.
const token = fs.readFileSync("./token.txt").toString().split("\n")[0];

// Confirm that the bot is ready to be used.
client.once("ready", () => {
    console.log("Ready.");
});

client.login(token);

client.on("message", message => {
    // Do not reply to the message if it doesn't start with the prefix or if it was sent by a bot.
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }
    
    // Remove the prefix from the message.
    const realMessage = message.content.slice(config.prefix.length+1);

    // Reply with the message.
    message.channel.send(realMessage);
    console.log(realMessage);
});