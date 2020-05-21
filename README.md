# yt-resolve
> Changes search queries into youtube links. Doesn't need an API key.

### Quick Start (aka Usage)
Add the search queries in `queries.txt` and run `start.bat`. Results are in `results.txt`.

If you finished downloading everything __and you don't need both the queries and results files__, open the terminal, `cd` into the directory where you have the project and type `node cleanup.js` to clean everything up. After you run this command, you can use `yt-resolve` again.

### Features
- High performance: tested with a query list of 4000 queries.
- Lightweight: RAM usage of around 15mb and 7% to 20% CPU usage on an i3.
- Simple: add the search queries and run!
- Doesn't need API keys: better privacy and easier to use.

### Why?
Let's assume you want to download some music. You found a playlist converter that can export all of the song names from your Spotify (or any streaming music service) playlist. Now, you want to download all of these songs off YouTube. You can use this tool to get the URL's of your songs and then add all of the URLs to a youtube downloader such as youtube-dl: `youtube-dl --batch-file='./results.txt'`

**Important:** That was just a example. __This project does not encourage piracy, and the authors are not responsible if you get in trouble.__
