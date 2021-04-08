const http = require('http');
const express = require('express');
const sockets = require('./sockets');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static("public"));

// Handle webSocket connections
sockets.listen(server);

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
