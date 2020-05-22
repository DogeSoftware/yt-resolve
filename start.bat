@echo off
mode con: cols=90 lines=26
title yt-resolve
where npm.cmd >nul 2>&1 && goto NPMInstalled || goto NPMNotInstalled
:NPMInstalled
where node.exe >nul 2>&1 && goto NodeInstalled || goto NodeNotInstalled
:NodeInstalled
cls
echo Updating Libraries . . .
echo.
call npm i
title yt-resolve
echo Libraries are up to date!
echo.
echo Press any key to continue . . .
pause>nul
cls
echo You can close this window at any time to stop the process
echo.
echo Press any key to begin . . .
pause>nul
cls
goto loop

:loop
if exist finished goto finished
call node ./index.js
goto loop

:NPMNotInstalled
echo Node Package Manager (NPM) is not installed on your system. Please install NPM and try again.
goto end

:NodeNotInstalled
echo NodeJS Runtime is not installed on your system. Please install NodeJS and try again.
goto end

:finished
del finished
goto end

:end
echo Press any key to close this program . . .
pause>nul
echo.
exit
