// Require built-in modules
const util = require("util"),
	exec = util.promisify(require("child_process").exec),
	realFS = require("fs");

// Check if node modules are installed, install them if not
if (!realFS.existsSync("./node_modules")) {
	console.log("Installing required libraries . . .");
	exec("npm i");
}
else {
	// it looks cool on my screen
	return console.log(`It looks like everything is installed. 
    If the app still fails to run, remove the "node_modules" 
    folder and try running this script (setup.js) again.`);
}