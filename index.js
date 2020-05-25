// I don't know what I'm doing rn, please send help it doesn't work AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// Require third party modules
const chalk = require('chalk'),
	drawBanner = require("./scripts/banner.js"),
	fs = require('graceful-fs'),
	pause = require("press-any-key"),
	setTitle = require("node-bash-title"),
	search = require('yt-search');

// Load Configuration
chalk.level = 1;
const queries = fs.readFileSync('./data/queries.txt', "utf8").split("\n");
let progress = 0;
const currentTime = new Date().toISOString().match(/(\d{0}:){0}\d{0}/)[0];

// Define Functions
function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}

function getLine(filename, lineNum) {
	const lines = fs.readFileSync(filename, "utf8").split("\n");
	return lines[lineNum];
}

function startup() {
	drawBanner();
	console.log("You can close this window at any time to stop the process\n");
	pause("Press any key to begin . . .");
	drawBanner();
}

// Set the terminal window's title
setTitle("yt-resolve");

// Clean up the previous data
fs.writeFileSync("./data/queries.txt", "", "utf8");
fs.appendFileSync('./data/results.txt', `\n${currentTime}\n`, 'utf8');

// Execute code
startup();
while (progress < queries.length) {
	const query = getLine("./data/queries.txt", progress);
	console.log(chalk.yellow(`Searching: ${query}`));
	const res = search(query);
	if (res && res.videos[0]) {
		const videos = res.videos;
		console.log(chalk.green(`Found video: ${videos[0].title}`));
		fs.appendFileSync("./data/results.txt", `${videos[0].url}\n`);
		progress++;
		sleep(250);
	}
	else {
		console.log(chalk.red('Could not find video! Ratelimit? Retrying . . .'));
	}
}
console.log(chalk.green('\nTask finished, or no search queries in "./data/queries.txt"'));
pause("Press any key to close this program . . .");