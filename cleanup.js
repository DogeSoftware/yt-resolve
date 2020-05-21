const chalk = require('chalk');
const config = require('./config.json');
const fs = require('fs');
console.log(chalk.yellow('Cleaning up..'));

fs.writeFileSync('./progress.txt', '0', 'utf8');
fs.writeFileSync(config.queriesFile, '', 'utf8');
fs.writeFileSync(config.outputFile, '', 'utf8');

console.log(chalk.green('Done!'));
