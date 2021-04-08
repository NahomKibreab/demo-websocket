const http = require('http');
const express = require('express');
const sockets = require('./sockets');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static("public"));

// Handle webSocket connections
sockets.listen(server);

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
