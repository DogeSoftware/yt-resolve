#!/bin/sh


# Define Functions
setTitle () { PROMPT_COMMAND='echo -ne "\033]0;yt-resolve\007"'; }


# Run Functions
setTitle
if [ $(which npm) ]
then
	if [ $(which node) ]
	then
		echo "Updating Libraries . . ."
		echo
		npm i
		setTitle
		echo "Libraries are up to date!"
		echo
		read -n 1 -s -r -p "Press any key to continue . . ."
		echo
		echo "    Close this window at any time to stop the process"
		echo
		echo
		read -n 1 -s -r -p "    Press any key to begin . . ."
		while [ true ]
		do
			node ./index.js
		done
	else
		echo "NodeJS Runtime is not installed on your system. Please install NodeJS and try again."
		exit 1
	fi
else
	echo "Node Package Manager (NPM) is not installed on your system. Please install NPM and try again."
	exit 1
fi
