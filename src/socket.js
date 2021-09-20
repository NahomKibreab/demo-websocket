const socketio = require('socket.io');

// Web socket connection listener
const start = function(httpServer) {

  const server = socketio(httpServer);

  server.on('connection', (socket) => {
    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We can use this ID and associate with a specific used
    console.log("connected:  ", socket.id);

    server.to(socket.id).emit('notify', `Connected ( ${socket.id} )`);

    socket.on('disconnect', () => {
      console.log("disconnect: ", socket.id);
    });
  });

};

module.exports = { start };