#!/bin/bash

# Set Title
PROMPT_COMMAND='echo -ne "\033]0;yt-resolve\007"'

# Check if NPM is installed
if [ $(which npm) ]
then
	# Check if Node is installed
	if [ $(which node) ]
	then
		# Make sure libraries are up-to-date
		echo "Updating Libraries . . ."
		echo
		npm i
		echo "Libraries are up to date!"
		echo
		read -rsn1 -p "Press any key to continue . . ."
		echo
		echo
		echo "    Close this window at any time to stop the process"
		echo
		echo
		read -n 1 -s -r -p "    Press any key to begin . . ."
		echo
		# Begin infinite loop
		while [ true ]
		do
			node ./index.js
		done
	else
		# Exit with error if Node is not installed
		echo "NodeJS Runtime is not installed on your system. Please install NodeJS and try again."
		exit 1
	fi
else
	# Exit with error if NPM is not installed
	echo "Node Package Manager (NPM) is not installed on your system. Please install NPM and try again."
	exit 1
fi
