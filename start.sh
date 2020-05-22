#!/bin/bash

# Set Title
PROMPT_COMMAND='echo -ne "\033]0;yt-resolve\007"'

# Check if NPM is installed
if [ $(which npm) ] ; then
	# Check if Node is installed
	if [ $(which node) ] ; then
		# Make sure libraries are up-to-date
		clear
		echo "Updating Libraries . . ."
		echo
		npm i
		echo "Libraries are up to date!"
		echo
		echo "Cleaning up . . ."
		echo -n >./data/result.txt
		echo -n >./data/buffer.txt
		echo -n "0" >./data/progress.txt
		echo "Done!"
		echo
		read -rsn1 -p "Press any key to continue . . ."
		node ./scripts/banner.js
		echo "You can close this window at any time to stop the process"
		echo
		read -rsn1 -p "Press any key to begin . . ."
		node ./scripts/banner.js
		# Begin infinite loop
		while [ true ] ; do
			if [[ -e ./finished ]] ; then
				rm ./finished
				echo -n >./data/queries.txt
				read -rsn1 -p "Press any key to close this program . . ."
				echo
				exit
			fi
			node ./index.js $(tput lines)
			echo -en "/033[0;0H"
			node ./scripts/banner.js
			$(which cat) ./data/buffer.txt
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
