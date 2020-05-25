// Thanks Stackoverflow!

// Require built-in modules
const util = require("util"),
	exec = util.promisify(require("child_process").exec),
	// the original fs is needed here to check if the other one is installed
	realFS = require("fs");


// Wrap everything in an anonymous function so we can use `await`
(async () => {

	// Check if node modules are installed, install them if not
	if (!realFS.existsSync("./node_modules")) {
		console.log("Installing required libraries . . .");
		await exec("npm i");
	}

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


	// Define Functions
	function sleep(ms) {
		return new Promise(res => setTimeout(res, ms));
	}

	function getLine(filename, lineNum) {
		const lines = fs.readFileSync(filename, "utf8").split("\n");
		return lines[lineNum];
	}

	const currentTime = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];

	// Set the terminal window's title
	setTitle("yt-resolve");

	// Clean up the previous data
	fs.writeFileSync("./data/queries.txt", "", "utf8");
	fs.appendFileSync('./data/result.txt', `\n${currentTime}\n`, 'utf8');

	// Execute code
	drawBanner();
	console.log("You can close this window at any time to stop the process\n");
	await pause("Press any key to begin . . .");
	drawBanner();
	while (progress < queries.length) {
		const query = getLine("./data/queries.txt", progress);
		console.log(chalk.yellow(`Searching: ${query}`));
		const res = await search(query);
		if (res && res.videos[0]) {
			const videos = res.videos;
			console.log(chalk.green(`Found video: ${videos[0].title}`));
			fs.appendFileSync("./data/results.txt", `${videos[0].url}\n`);
			progress++;
			sleep(250);
		}
		else {
			console.log(chalk.red('Could not find video! Ratelimit? Retrying . . .'));
			throw 'Error while searching the video';
		}
	}
	console.log(chalk.green('\nTask finished, or no search queries in "./data/queries.txt"'));
	pause("Press any key to close this program . . .");
})();
