const chalk = require('chalk'),
	fs = require('fs');

console.log(chalk.yellow('Cleaning up . . .'));

fs.writeFileSync('./progress.txt', '0', 'utf8');
fs.writeFileSync('./queries.txt', '', 'utf8');
fs.writeFileSync('./result.txt', '', 'utf8');

console.log(chalk.green('Done!'));
