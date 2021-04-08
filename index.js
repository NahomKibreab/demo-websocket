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
addSocketListeners(io);

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// Add a web socket connection listener
function addSocketListeners(io) {
  io.on('connection', (socket) => {
    // socket param the sending socket with unique ID
    // We could save the ID's and associate with a specific client
    console.log("connected:  ", socket.id);

    socket.on('disconnect', () => {
      console.log("disconnect: ", socket.id);
    });

    socket.on('chat message', msg => {
      // Send any received message to all 
      io.emit('chat message', "Received: " + msg);

      // Send private message back to the sender
      io.to(socket.id).emit('chat message', 'Private reply');
    });
  });

};