const http = require('http');
const express = require('express');
const socket = require('./socket');

const app = express();
const httpServer = http.Server(app);
const port = process.env.PORT || 8002;

app.use(express.static("public"));

// Handle webSocket connections
socket.start(httpServer);

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
