module.exports = () => {
	const chalk = require("chalk");
	console.clear();
	console.log(chalk.cyan(
		"         _                            _             \n" +
		"   _   _| |_      _ __ ___  ___  ___ | |_   _____   \n" +
		"  | | | | __|____| '__/ _ :/ __|/ _ :| : : / / _ :  \n" +
		"  | |_| | ||_____| | |  __/:__ : (_) | |: V /  __/  \n" +
		"   :__, |:__|    |_|  :___||___/:___/|_| :_/ :___|  \n" +
		"   |___/          ").replace(/:/g, "\\") +
		`${chalk.underline("Made by DogeSoftware Group 2020")}\n\n`,
	);
};