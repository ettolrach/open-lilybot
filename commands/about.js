// To run bash commands.
const { exec } = require("child_process");

module.exports = {
	name: "about",
    description: "Show version information about the bot and Lilypond.",
    aliases: ["-v", "$v"],
	execute(message, args) {
        toSend = "Open Lilybot 0.1.0\n";

        const lilypond = exec("lilypond -v", (error, stdout, stderr) => {
            if (error) {
                console.log(error.stack);
                console.log("Error code: " + error.code)
                console.log("Signal received: " + error.signal);
                console.log("Time of error: " + String(Date()));
                message.channel.send("An error has occured: ```" + error.stack + "```");
                return;
            }

            toSend = toSend + stdout.split("\n")[0];
            console.log(toSend);
            message.channel.send(toSend);
        });
    },
};