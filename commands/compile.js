module.exports = {
	name: "compile",
    description: "Compile Lilypond code.",
    args: false,
    usage: "[OPTION]... FILE...",
	execute(message, args) {
		message.channel.send("Pong.");
	},
};