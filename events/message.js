module.exports = async (client, message) => {
    // Do not reply to the message if it doesn't start with the prefix or if it was sent by a bot.
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) {
        return;
    }
    
    // Remove the prefix from the message.
    const realMessage = message.content.slice(client.config.prefix.length+1);
    
    // Create a commandName variable that will hold the name of the command.
    let commandName = "";
    // Create array that holds the parts of the user's message.
    let args = [];

    // Do the following if there is a code block.
    if(realMessage.includes("```")) {
        // Split the message by the code block (```)
        args = realMessage.split("```");

        // Remove any space that has been typed form the before and after the code block.
        args[0] = args[0].replace(/\s/g, '');
        args[2] = args[2].replace(/\s/g, '');

        // If there's no command specified, assume compile.
        commandName = "compile"
    }
    // Otherwise, separate the message into the command and its arguments.
    else {
        args = realMessage.split(" ");
        commandName = args.shift();
        console.log(commandName);
    }

    // If the command doesn't exist, inform the user.
    if (!client.commands.has(commandName)) {
        return;
    }

    const command = client.commands.get(commandName);
    
    // The command.args part checks whether arguments need to be specified. Because args is a part of command, this if is only called when needed.
    if (command.args && !args.length) {
        let reply = `Error, no arguments provided.`;

		if (command.usage) {
			reply += `\nUsage: \`${prefix} ${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

    // Otherwise, try to run the command.
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

    /*
    // Reply with the message.
    message.channel.send(realMessage);*/
    console.log(args);
}