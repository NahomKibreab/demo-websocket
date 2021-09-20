const socketio = require('socket.io');

let connected = 0;

const sendStatus = function(server) {
  const status = { connected };
  console.log(status);
  server.emit('status', status);
};

// Web socket connection listener
const start = function(httpServer) {

  const server = socketio(httpServer);

  server.on('connection', (socket) => {
    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We can use this ID and associate with a specific used
    console.log("connected:  ", socket.id);

    server.to(socket.id).emit('notify', `Connected ( ${socket.id} )`);
    connected++;
    sendStatus(server);

    socket.on('disconnect', () => {
      console.log("disconnect: ", socket.id);
      connected--;
      sendStatus(server);
    });
  });

};

module.exports = { start };