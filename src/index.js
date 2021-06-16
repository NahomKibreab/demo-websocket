const http = require('http');
const express = require('express');
const sockets = require('./sockets');

const app = express();
const httpServer = http.Server(app);
const port = process.env.PORT || 8002;

app.use(express.static("public"));

// Handle webSocket connections
sockets.listen(httpServer);

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
