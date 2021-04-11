// Load the configuration.
const config = require("../config.json");

module.exports = {
	name: "help",
    description: "Show commands and provide help.",
    args: false,
	execute(message, args) {
		if (args.length == 0) {
			message.channel.send(
`**__List of commands__**
· \`about\` Show the version of the bot and Lilypond.
· \`compile\` Compile Lilypond code. This command is most likely the one which you would use most frequently.
· \`help\` Show this list of commands and get more information about specific commands.
· \`ping\` Check if the bot is online and get ponged back.

You can type \`${config.prefix} help COMMAND\` to get help about a specific command.`
			);
			return;
		}

		switch (args[0]) {
			case "about":
				message.channel.send(`Usage: \`${config.prefix} about\`\n\nDescription:Show the version of the bot and Lilypond. You can visit this link to see the latest version. https://github.com/ettolrach/open-lilybot/releases`)
				break;

			case "compile":
				message.channel.send(`**Usage:** \`${config.prefix} [compile] FILE [OPTION]...\`\n\n**Description:** Compile some Lilypond code. You can include any options and they will be passed to Lilypond. The most useful of which is \`-dpreview\` which will send and image of the generated code instead of a PDF.\n\n**Options:**\n· \`$v\`, \`$$verbose\`: include Lilypond's output from the terminal when compilation is finished.\n**NOTE** that the options should come after the file (code), not before!\n\n**Example:**\n${config.prefix} -dpreview\n\\\`\\\`\\\`\\relative c'' {\n\\clef "treble"\n\\time\n4/4\nc2 e4 g\nb,4. c16 d c4 r4\n}\\\`\\\`\\\` $v`)
				break;

			case "help":
				message.channel.send(`Usage: \`${config.prefix} help [COMMAND NAME]...\`\nDescription: View the list of commands. You can also specify a specific command after \`help\` so you can view more detailed information about a specific command, just like you did now.`)
				break;

			case "ping":
				message.channel.send(`Usage: \`${config.prefix} ping\`\nDescription: This will send back a message as soon as possible. This command is mainly used to check if the bot is online.`)
				break;
		
			default:
				message.channel.send(`That command does not exist. Run \`${config.prefix} help\` to view all the commands.`)
				break;
		}
	},
};