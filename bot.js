// Import different modules.
const Discord = require("discord.js");
const client = new Discord.Client();
// To access files.
const fs = require("fs");
// Load the configuration.
const config = require("./config.json");
// Load any commands.
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Read the token and display it. The extra stuff after .toString() is to ensure that only the first line is used, the one which hopefully has the token.
const token = fs.readFileSync("./token.txt").toString().split("\n")[0];

client.login(token);

// Confirm that the bot is ready to be used.
client.once("ready", () => {
    console.log("Ready.");
    client.user.setPresence({ activity: { name: `"${config.prefix} help" for help`, type: "LISTENING"}, status: "idle" }).then(console.log).catch(console.error)
});

client.on("message", message => {
    // Do not reply to the message if it doesn't start with the prefix or if it was sent by a bot.
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }
    
    // Remove the prefix from the message.
    const realMessage = message.content.slice(config.prefix.length+1);
    
    // Create a commandName variable that will hold the name of the command.
    let commandName = "";
    // Create array that holds the parts of the user's message.
    let args = [];

    // Do the following if there is a code block.
    if(realMessage.includes("```")) {
        // Split the message by the code block (```)
        args = realMessage.split("```");

        // Remove any space that has been typed form the before and after the code block.
        //args[0] = args[0].replace(/\s/g, "");

        // If there's no command specified, assume compile.
        commandName = "compile"
    }
    // Otherwise, separate the message into the command and its arguments.
    else {
        args = realMessage.split(" ");
        commandName = args.shift();
    }

    // "command" is the command itself and the code attatched to it.
    // This line will look for that command or if that doesn't exit, and command whose aliases includes the entered command name.
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If the command doesn't exist, inform the user and stop.
    if (!command) {
        message.channel.send("That command doesn't exist.");
        return;
    }
    
    // The command.args part checks whether arguments need to be specified. Because args is a part of command, this if is only called when needed.
    if (command.args && !args.length) {
        let reply = `Error, no arguments provided.`;

		if (command.usage) {
			reply += `\n**Usage:** ${command.usage}`;
		}
        if (command.options) {
            reply += `\n**Options:** ${command.options}`;
        }

		return message.channel.send(reply);
    }

    // Otherwise, try to run the command.
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command. More information has been written to the terminal.");
    }
});

// Read the topggtoken and display it. The extra stuff after .toString() is to ensure that only the first line is used, the one which hopefully has the token.
const topggtoken = fs.readFileSync("./topggtoken.txt").toString().split("\n")[0];
const Topgg = require('@top-gg/sdk')
const api = new Topgg.Api(topggtoken)

setInterval(() => {
  api.postStats({
    serverCount: client.guilds.cache.size,
    shardId: client.shard.ids[0], // if you're sharding
    shardCount: client.options.shardCount
  })
}, 1800000) // post every 30 minutes

