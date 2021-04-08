const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static("public"));

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
