const socketio = require('socket.io');

let connected = 0;

// Web socket connection listener
const start = function(httpServer) {

  const server = socketio(httpServer);

  // Can use a closure.  server is remembered
  const sendStatus = function() {
    const status = { connected };
    console.log(status);
    server.emit('status', status);
  };

  server.on('connection', (socket) => {
    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We can use this ID and associate with a specific used
    console.log("connected:  ", socket.id);

    server.to(socket.id).emit('notify', `Connected [ ${socket.id} ]`);
    connected++;
    sendStatus();

    socket.on('disconnect', () => {
      console.log("disconnect: ", socket.id);
      connected--;
      sendStatus();
    });
  });

};

module.exports = { start };