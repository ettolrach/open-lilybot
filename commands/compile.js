// To run bash commands.
const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
	name: "compile",
    description: "Compile Lilypond code.",
    args: false,
    usage: "[OPTION]... FILE...",
	execute(message, args) {
        // Write the code to a file.
        fs.writeFileSync("code.ly", args[1]);

        const lilypond = exec("lilypond " + args[0] + " --output=generatedFiles code.ly ", (error, stdout, stderr) => {
            if (error) {
                console.log(error.stack);
                console.log("Error code: " + error.code)
                console.log("Signal received: " + error.signal);
                console.log("Time of error: " + String(Date.now.toLocaleTimeString("en-GB")));
            }
            console.log("Child process STDOUT:\n" + stdout);
            console.log("Child process STDERR:\n" + stderr);
            
            // Get the most recent file in the folder and upload that one.
            let files = fs.readdirSync("./generatedFiles");

            // Use this to track the current newest files.
            let currentLatestTime = new Date(0);
            let latestTimePosition = 0;
            for (let i = 0; i < files.length; i++) {
                if (fs.statSync("./generatedFiles/" + files[i]).ctime > currentLatestTime) {
                    currentLatestTime = fs.statSync("./generatedFiles/" + files[i]).ctime;
                    latestTimePosition = i;
                }
            }

            message.channel.send("Output:", { files: [`./generatedFiles/${files[latestTimePosition]}`]})
        });

	},
};