// To run bash commands.
const { exec } = require("child_process");
const fs = require("fs");
// Load the configuration.
const config = require("../config.json");

module.exports = {
	name: "compile",
    description: "Compile Lilypond code.",
    args: true,
    usage: `\`${config.prefix} [compile] FILE [OPTION]...\` Note that you don't need to include "compile". For more info, type \`${config.prefix} help compile\`.`,
    options: `· \`png\`, \`preview\`: render a PNG and upload it.\n· \`$v\`, \`verbose\`: run the command with the -dverbose flag. This can be useful if you have made a mistake and don't know what's wrong.`,
	execute(message, args) {
        // Remove "compile" if the user specified it so that it doesn't get passed into the Lilypond command.
        if (args[0].substring(0, 7) == "compile") {
            args[0] = args[0].substring(7);
        }

        // Write the code to a file.
        fs.writeFileSync("code.ly", args[1]);
        // If the output folder doesn't already exist, create it.
        if (!fs.existsSync("./generatedFiles")) {
            fs.mkdirSync("./generatedFiles");
        }

        let lilypondArgs = "";
        let verbose = false;
        realArgs = args[0].split(" ");
        if (realArgs.includes("preview") || realArgs.includes("png") || realArgs.includes("preview\n") || realArgs.includes("png\n")) {
            lilypondArgs = lilypondArgs + "-dpreview ";
        }
        if (realArgs.includes("verbose") || realArgs.includes("verbose\n")) {
            lilypondArgs = lilypondArgs + "-dverbose ";
            verbose = true;
        }

        // Run the Lilypond command to compile the code.
        const lilypond = exec("lilypond " + lilypondArgs + " -dsafe --output=generatedFiles code.ly ", (error, stdout, stderr) => {
            // Report an error if one occured.
            if (error) {
                console.log(error.stack);
                console.log("Error code: " + error.code)
                console.log("Signal received: " + error.signal);
                console.log("Time of error: " + String(Date()));
                message.channel.send("An error has occured when trying to compile. The terminal output is as follows: ```" + error.stack + "```");
                return;
            }
            
            // Get the most recent file in the folder and upload that one.
            // First get all files in the folder.
            let files = fs.readdirSync("./generatedFiles");

            // Then use this to track the current newest files.
            let currentLatestTime = new Date(0);
            let latestTimePosition = 0;
            for (let i = 0; i < files.length; i++) {
                if (fs.statSync("./generatedFiles/" + files[i]).ctime > currentLatestTime) {
                    currentLatestTime = fs.statSync("./generatedFiles/" + files[i]).ctime;
                    latestTimePosition = i;
                }
            }
            
            // Send the generated file.
            message.channel.send("Generated file:", { files: [`./generatedFiles/${files[latestTimePosition]}`] });

            // Also send the terminal output if $v was specified.
            if (verbose) {
                message.channel.send("Output: ```" + stderr + "```");
            }
        });

	},
};