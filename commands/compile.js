// To run bash commands.
const { exec } = require("child_process");
const fs = require("fs");
// Load the configuration.
const config = require("../config.json");

module.exports = {
	name: "compile",
    description: "Compile Lilypond code.",
    args: true,
    usage: `\`${config.prefix} [compile] FILE [OPTION]...\` Note that you don't need ot write "compile". That means you can also type \`${config.prefix} FILE [OPTIONS]...\``,
    options: `\`$v\`, \`$$verbose\`: include Lilypond's output from the terminal when compilation is finished. **NOTE** that the options should come after the file (code), not before!`,
	execute(message, args) {
        if (args[0].substring(0, 7) == "compile") {
            args[0] = args[0].substring(7);
        }
        console.log("---");
        for (let i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
        console.log("---");
        // Write the code to a file.
        fs.writeFileSync("code.ly", args[1]);
        // If the output folder doesn't already exist, create it.
        if (!fs.existsSync("./generatedFiles")) {
            fs.mkdirSync("./generatedFiles");
        }

        const lilypond = exec("lilypond " + args[0] + " --output=generatedFiles code.ly ", (error, stdout, stderr) => {
            if (error) {
                console.log(error.stack);
                console.log("Error code: " + error.code)
                console.log("Signal received: " + error.signal);
                console.log("Time of error: " + String(Date()));
                message.channel.send("An error has occured when trying to compile. The terminal output is as follows: ```" + error.stack + "```");
                return;
            }
            
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
            
            // Send the generated file.
            message.channel.send("Generated file:", { files: [`./generatedFiles/${files[latestTimePosition]}`] })
            // Also send the terminal output if $v was specified.
            if (args[2] == "$$verbose" || args[2] == "$v") {
                message.channel.send("Output: ```" + stderr + "```");
            }
        });

	},
};