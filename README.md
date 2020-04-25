# Open Lilybot

A Discord bot that renders Lilypond code using Node.js.

## Requirements

* A Unix-like system. This has currently been tested only on Arch Linux and will most likely not work on Windows without modifying the code. That said, you can edit the code as you wish on your machine to make it work.
* [Discord.js](https://www.npmjs.com/package/discord.js). Used to interact with Discord. Install this using npm (run `npm install discord.js` in the directory where the bot is located).
* [Lilypond](https://lilypond.org/index.html). Used to compile Lilypond code. Install this like any other software (e.g. on Arch Linux, `pacman -S lilypond`).

## Installation

You cannot invite the bot. This is due to it running code from the terminal which isn't supported by certain server hosting services, and because it requires Lilypond, which isn't provided in the NPM. Instead, you should do the following:

* Create a new bot yourself by going to Discord's Developer Portal.
* Copy the token and paste it to token.txt in the same directory as the where the bot (`bot.js`) is located.
* If not already done, install Lilypond, and run `npm install discord.js` in the same directory.
* Run `node bot.js` in your favourite terminal.

## Configuration

Currently, the following can be configured by editing the `config.json` file. Editing the JSON file should be straight forward, even for people with little experience with JSON.

* The prefix used. By default, this if `$lilypond`. 

## Usage

Open Lilybot is designed to work just like regular Lilypond does from the terminal. That means to compile some Lilypond code, you should type ``$lilypond ```\relative { c' d e f g a b c }```
``. You can't upload a Lilypond file due to security reasons, that isn't the purpose for this bot anyway.

Extra options can be passed as usual (with the exception of `--output`). Note, however, that *only the most recent file is uploaded*! That means that using `-dpreview` will not upload a PDF and a PNG file, but only a PNG.

### Custom options

These options exist only for this bot and not in Lilypond. After the three grave accents (a.k.a. backticks) further options can be typed, each with the prefix:

* `$$verbose`, or `$v`: Show the output of Lilypond's compiling process. This is hidden by default to not clog up the chat.
