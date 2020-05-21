// Thanks Stackoverflow!

// Require Modules
const chalk = require('chalk'),
	fs = require('fs'),
	search = require('yt-search');

// Load Configuration
const outputFile = './result.txt',
	progress = parseInt(fs.readFileSync('./progress.txt', 'utf8')),
	queriesFile = './queries.txt',
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

// Call Functions
getLine(queriesFile, progress, (err, line) => {
	console.log(chalk.yellow(`Searching: ${line}`));
	if (line == undefined) return console.log(chalk.yellow(`Task finished, or no search queries in ${queriesFile}!`));
	search(line, (err, res) => {
		if (res) {
			const videos = res.videos;
			console.log(chalk.green(`Found video: ${videos[0].title}`));
			// saves the current line
			fs.writeFileSync('./progress.txt', `${progress + 1}`, 'utf8');
			// saves the output url
			resultfile.write(`${videos[0].url}\n`);
			resultfile.end();
		} else return console.log(chalk.red('Could not find video! Ratelimit? Retrying..'));
	});
	// a simple fix to minimize ratelimits
	sleep(250);
});
