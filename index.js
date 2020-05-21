// Thanks Stackoverflow!
const search = require('yt-search');
const fs = require('fs');
const progress = parseInt(fs.readFileSync('./progress.txt', 'utf8'));
const config = require('./config.json');
const resultfile = fs.createWriteStream('./result.txt', { flags: 'a' });
const chalk = require('chalk');

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function get_line(filename, line_no, callback) {
	fs.readFile(filename, function(err, data) {
		if (err) throw err;

		// Data is a buffer that we need to convert to a string
		// Improvement: loop over the buffer and stop when the line is reached
		const lines = data.toString('utf-8').split('\n');

		if(+line_no > lines.length) {
			return callback('File end reached without finding line', null);
		}

		callback(null, lines[+line_no]);
	});
}

get_line(config.file, progress, function(err, line) {
	console.log(chalk.yellow('Searching: ' + line));
	if(line == undefined) return console.log(chalk.yellow(`Task finished, or no search queries in ${config.file}!`));
	search(line, function(err, r) {
		if(r) {
			const videos = r.videos;
			console.log(chalk.green(`Found video: ${videos[0].title}`));
			// saves the current line
			fs.writeFileSync('./progress.txt', `${progress + 1}`, 'utf8');
			// saves the output url
			resultfile.write(`${videos[0].url}\n`);
			resultfile.end();
		}
		else {
			return console.log(chalk.red('Could not find video! Ratelimit? Retrying..'));
		}
	});
	sleep(250);
});