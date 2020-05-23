// This code needs to be improved.

// Load Third-Party Libraries
const search = require("yt-search"),
  express = require("express"),
  app = express();

// If the client requests /, send them the API's main page.
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// API Start
// JSON API: Delivers information of the first video to the client.
app.get("/api/json/:query", (request, response) => {
  search(request.params, (err, res) => {
    if (res) {
      const videos = res.videos;
      console.log(`Sending first result to client`);
      /*
      Delivers the data to the user.
      If there's an error, the server will
      send error 500, which means
      Internal Server Error.
      https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
      */
      response.send(videos[0]);
    } else response.status(500);
  });
});

// Full JSON API: Delivers all information to the client.
app.get("/api/json/:query/full", (request, response) => {
  search(request.params, (err, res) => {
    if (res) {
      console.log(`Sending full results to client`);
      response.send(res);
    } else response.status(500);
  });
});

// Same as above, but for videos
app.get("/api/json/:query/full/videos", (request, response) => {
  search(request.params, (err, res) => {
    if (res) {
      console.log(`Sending full video results to client`);
      response.send(res.videos);
    } else response.status(500);
  });
});

// Same as above, but for channels
app.get("/api/json/:query/full/channels", (request, response) => {
  search(request.params, (err, res) => {
    if (res) {
      console.log(`Sending full channel results to client`);
      response.send(res.channels);
    } else response.status(500);
  });
});

// Same as above, but for playlists
app.get("/api/json/:query/full/playlists", (request, response) => {
  search(request.params, (err, res) => {
    if (res) {
      console.log(`Sending full channel results to client`);
      response.send(res.playlists);
    } else response.status(500);
  });
});

// Plaintext API: Delivers only the video URL.
app.get("/api/pt/:query/url", (request, response) => {
  search(request.params, (err, res) => {
    if (res) {
      const videos = res.videos;
      console.log(`Sending first result to client (plain-text)`);
      response.send(videos.url[0]);
    } else response.status(500);
  });
});

// Listen for requests.
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
