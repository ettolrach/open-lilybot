// To run bash commands.
const { exec } = require("child_process");

module.exports = {
    name: "about",
    description: "Show version information about the bot and Lilypond.",
    aliases: ["-v", "version"],
    execute(message) {
        let toSend = "Open Lilybot 1.1.1\n";

        const lilypondVersionCommand = new Promise((resolve, reject) => {
            exec("lilypond -v", (error, stdout, stderr) => {
                if (error) {
                    console.log(error.stack);
                    console.log("Error code: " + error.code)
                    console.log("Signal received: " + error.signal);
                    console.log("Time of error: " + String(Date()));
                    reject(err);
                    return;
                }
                resolve(stdout.split("\n")[0]);
            });
        });

        lilypondVersionCommand.then(async lilypondOutput => {
            toSend += lilypondOutput + "\nThis project is open source, view the code at <https://github.com/ettolrach/open-lilybot/>.";
            message.channel.send(toSend);
        }).catch(async err => {
            console.log(err);
            message.channel.send("An error has occured while attempting to get the version number of Lilypond (maybe check whether Lilypond is installed on the server?): ```" + error.stack + "```");
        });
    },
};