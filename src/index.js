const express = require('express');
const socket = require('./socket');

const app = express();
const port = process.env.PORT || 8002;

app.use(express.static("public"));

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Handle webSocket connections
socket.start(httpServer);