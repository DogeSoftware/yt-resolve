// Thanks Stackoverflow!

// Require Modules
const chalk = require('chalk'),
	fs = require('fs'),
	search = require('yt-search'),
	height = process.argv[2] - 8;

chalk.level = 1;

// Load Configuration
const outputFile = './data/result.txt',
	progress = parseInt(fs.readFileSync('./data/progress.txt', 'utf8')),
	queriesFile = './data/queries.txt',
	resultfile = fs.createWriteStream(outputFile, { flags: 'a' });
	
// Define Functions
function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}

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

function finished() {
	fs.appendFileSync("./data/buffer.txt", chalk.green(`\nTask finished, or no search queries in ${queriesFile}!\n`), "utf8");
	fs.writeFileSync('./finished', "", "utf8");
}

// Call Functions
getLine(queriesFile, progress, (err, line) => {
	if (!line) return finished();
	fs.appendFileSync("./data/buffer.txt", chalk.yellow(`Searching: ${line}\n`), "utf8");
	search(line, (err, res) => {
		if (res) {
			const videos = res.videos;
			fs.appendFileSync("./data/buffer.txt", chalk.green(`\nFound video: ${videos[0].title}\n`), "utf8");
			// saves the current line
			fs.writeFileSync('./data/progress.txt', `${progress + 1}`, 'utf8');
			// saves the output url
			resultfile.write(`${videos[0].url}\n`);
			resultfile.end();
		} else fs.appendFileSync("./data/buffer.txt", chalk.red('\nCould not find video! Ratelimit? Retrying . . .\n'), "utf8");
	});
	let lineArray = fs.readFileSync("./data/buffer.txt", "utf8").split("\n");
	while (lineArray.length > height - 1) lineArray.shift();
	lineArray.pop();
	fs.writeFileSync("./data/buffer.txt", lineArray.join("\n"), "utf8");
	// a simple fix to minimize ratelimits
	sleep(250);
});
