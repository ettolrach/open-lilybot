// Load the configuration.
const { prefix } = require("../config.json");

module.exports = {
    name: "help",
    description: "Show commands and provide help.",
    aliases: ["commands"],
    args: false,
    execute(message, args) {
        if (args.length == 0) {
            message.channel.send(
`__**List of commands**__
· \`about\` Show the version of the bot and of Lilypond.
· \`compile\` Compile Lilypond code.
· \`help\` Show this list of commands and get more information about speific commands.
· \`ping\` Check if the bot is online and get ponged back.

You can type \`\`${prefix} help [COMMAND]\` to get information about a specific command.`
            );
            return;
        }

        switch (args[0]) {
            case "about":
                message.channel.send(
`**Usage:** \`${prefix} about\`

**Description:** Show the version of the bot and of Lilypond.`
                );
                break;

            case "compile":
                message.channel.send(
`**Usage:** \`${prefix} [compile] [OPTION]... FILE\` Note that you don't need to include "compile", as shown in the example below.

**Description:** Compile some Lilypond code. You can include options as detailed below.

**Options:**
· \`png\`, \`preview\`: render a PNG and upload it.
· \`verbose\`: run the command with the -dverbose flag. This can be useful if you have made a mistake and don't know what's wrong.

**Example:**
${prefix} preview
\\\`\\\`\\\`\\relative c'' {
    \\clef "treble"
    \\time 4/4
    c2 e4 g
    b,4. c16 d c4 r4
}\\\`\\\`\\\``
                );
                break;

            case "help":
                message.channel.send(
`**Usage:** \`${prefix} help [COMMAND NAME]\`


**Description:** View the list of commands. If a command name is specified, you will get more detailed information about it.

**Commands:**
· about
· compile
· help
· ping`
                );
                break;

            case "ping":
                message.channel.send(
`**Usage:** \`${prefix} ping\`

**Description:** This will send back a message as soon as possible. Use this to check if the bot is online.`
                );
                break;
        
            default:
                message.channel.send(`That command does not exist. Run \`${prefix} help\` to view all the commands.`);
                break;
        }
    },
};