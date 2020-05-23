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
      // Delivers the first result of the search results
      response.send(videos[0]);
      // If there was no response, returns http code 500
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

// Full JSON API, but with a filter
app.get("/api/json/:query/full/:type", (request, response) => {
  search(request.params.query, (err, res) => {
    if (res) {
      if (request.params.type === "channels") {
        console.log(`Sending full channel results to client`);
        response.send(res.channels);
      } else if (request.params.type === "videos") {
        console.log(`Sending full video results to client`);
        response.send(res.videos);
      } else if (request.params.type === "playlists") {
        console.log(`Sending full playlist results to client`);
        response.send(res.playlists);
        // Returns 501 (Not Implemented) if the user tries
        // to use a not-implemented type
      } else response.status(501);
      // If there was no response from YouTube, return
      // 500 (Internal Server Error).
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

// Easter Egg
app.get("/teapot", (request, response) => {
  response.status(418).send("yea im a teapot. what is this? your browser received http code 418 (im a teapot).");
});

// Listen for requests.
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
