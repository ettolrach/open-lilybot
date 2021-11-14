// Load the configuration.
const config = require("../config.json");

module.exports = {
    name: "help",
    description: "Show commands and provide help.",
    aliases: ["commands"],
    args: false,
    execute(message, args) {
        if (args.length == 0) {
            message.channel.send(
`**__List of commands__**
· \`about\`, \`version\`, \`-v\` Show the version of the bot and Lilypond.
· \`compile\` Compile Lilypond code. This command is most likely the one which you would use most frequently.
· \`help\` Show this list of commands and get more information about specific commands.
· \`ping\` Check if the bot is online and get ponged back.

You can type \`${config.prefix} help COMMAND\` to get help about a specific command.`
            );
            return;
        }

        switch (args[0]) {
            case "about":
                message.channel.send(`Usage: \`${config.prefix} about\`\n\nDescription:Show the version of the bot and Lilypond. You can visit this link to see the latest version. https://github.com/ettolrach/open-lilybot/releases`);
                break;

            case "compile":
                message.channel.send(
`**Usage:** \`${config.prefix} [compile] [OPTION]... FILE\` Note that you don't need to include "compile", as shown in the example below.

**Description:** Compile some Lilypond code. You can include options as detailed below.

**Options:**
· \`png\`, \`preview\`: render a PNG and upload it.
· \`verbose\`: run the command with the -dverbose flag. This can be useful if you have made a mistake and don't know what's wrong.

**Example:**
${config.prefix} preview
\\\`\\\`\\\`\\relative c'' {
    \\clef "treble"
    \\time 4/4
    c2 e4 g
    b,4. c16 d c4 r4
}\\\`\\\`\\\``
                    );
                break;

            case "help":
                message.channel.send(`Usage: \`${config.prefix} help [COMMAND NAME]...\`\nDescription: View the list of commands. You can also specify a specific command after \`help\` so you can view more detailed information about a specific command, just like you did now.`);
                break;

            case "ping":
                message.channel.send(`Usage: \`${config.prefix} ping\`\nDescription: This will send back a message as soon as possible. This command is mainly used to check if the bot is online.`);
                break;
        
            default:
                message.channel.send(`That command does not exist. Run \`${config.prefix} help\` to view all the commands.`);
                break;
        }
    },
};