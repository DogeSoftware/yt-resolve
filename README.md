# yt-resolve
> Changes search queries into youtube links. Doesn't need an API key.

### How to Use
- Add the search queries in `queries.txt` (in the `data` folder).
- If on Windows, run `start.bat`
- If on Linux, run `start.sh`
- Results will appear in `results.txt` (in the `data` folder).
- Running `node cleanup.js` in the working directory will erase `queries.txt` and `results.txt`, and set `progress.txt` back to 0.

### Features
- High performance: tested with a query list of 4000 videos
- Lightweight: RAM usage of around 15mb and 7 to 20 percent CPU usage on an i3
- Simple: add the search queries and run!
- Doesn't need API keys: better privacy and easier to use

### Why?
Let's assume you want to download some music. You found a playlist converter that can export all of the song names from your Spotify (or any streaming music service) playlist. Now, you want to download all of these songs off YouTube. You can use this tool to get the URL's of your songs and then add all of the URLs to a youtube downloader such as youtube-dl: `youtube-dl --batch-file='./result.txt'`

**NOTE: That was just a example. The "DogeSoftware" group respects the intellectual property rights of others, and requests you to do the same. DogeSoftware does not permit infringement of intellectual property rights through their software. This project is intended for educational purposes only!**

### Web API
The project was ported to a web API. It doesn't support batch/bulk searching yet, but you can search things with it without cloning this entire repository, downloading Node.js and doing other things. [https://yt-resolve.glitch.me/](https://yt-resolve.glitch.me/)

### Confused?
Please see [the wiki](https://github.com/DogeSoftware/yt-resolve/wiki).
