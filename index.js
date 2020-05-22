// Thanks Stackoverflow!

// Require Modules
const chalk = require('chalk'),
	fs = require('fs'),
	search = require('yt-search');

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
	console.log(chalk.green(`\nTask finished, or no search queries in ${queriesFile}!`));
	fs.writeFileSync('./finished', "", "utf8");
}

// Call Functions
getLine(queriesFile, progress, (err, line) => {
	if (!line) return finished();
	console.log(chalk.yellow(`Searching: ${line}`));
	search(line, (err, res) => {
		if (res) {
			const videos = res.videos;
			console.log(chalk.green(`Found video: ${videos[0].title}`));
			// saves the current line
			fs.writeFileSync('./data/progress.txt', `${progress + 1}`, 'utf8');
			// saves the output url
			resultfile.write(`${videos[0].url}\n`);
			resultfile.end();
		} else return console.log(chalk.red('Could not find video! Ratelimit? Retrying..'));
	});
	// a simple fix to minimize ratelimits
	sleep(250);
});
