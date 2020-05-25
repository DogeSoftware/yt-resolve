// Thanks Stackoverflow!

// Require built-in modules
const util = require("util"),
	exec = util.promisify(require("child_process").exec),
	realFS = require("fs"); // the original fs is needed here to check if the other one is installed


// Wrap everything in an annonymous function so we can use `await`
(async () => {

	// Check if node modules are installed, install them if not
	if (!realFS.existsSync("./node_modules")) {
		try {
			console.log("Installing required libraries . . .");
			await exec("npm i");
		} catch (err) {
			throw err;
		}
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
	};

	function getLine(filename, lineNum, callback) {
		fs.readFile(filename, (err, data) => {
			if (err) throw err;
			// Data is a buffer that we need to convert to a string
			// Improvement: loop over the buffer and stop when the line is reached
			const lines = data.toString('utf-8').split('\n');
			if (+lineNum > lines.length) return callback('File end reached without finding line', null);
			callback(null, lines[+lineNum]);
		});
	}


	// Set Title
	setTitle("yt-resolve");


	// Clean up "./data"
	fs.writeFileSync("./data/results.txt", "", "utf8");


	// Execute code
	drawBanner();
	console.log("You can close this window at any time to stop the process\n");
	await pause("Press any key to begin . . .");
	drawBanner();
	for (query of queries) {
		console.log(chalk.yellow(`Searching: ${query}`));
		try {
			const res = await search(query);
			if (res) {
				const videos = res.videos;
				console.log(chalk.green(`Found video: ${videos[0].title}`));
				fs.appendFileSync("./data/results.txt", `${videos[0].url}\n`);
			} else console.log(chalk.red('Could not find video! Ratelimit? Retrying . . .'));
		} catch (err) { throw err }
	}
	console.log(chalk.green(`\nTask finished, or no search queries in "./data/queries.txt"`));
	pause("Press any key to close this program . . .");
})()
