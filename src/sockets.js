const socketio = require('socket.io');

// Web socket connection listener
const listen = function (httpServer) {
  const server = socketio(httpServer);

  server.on('connection', (socket) => {
    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We could save the ID's and associate with a specific client if we wanted
    console.log("connected:  ", socket.id);

    socket.on('disconnect', () => {
      console.log("disconnect: ", socket.id);
    });

    socket.on('chat message', msg => {
      // Send any received message to all 
      server.emit('public message', "Sent to all: " + msg);

      // Send private message back to the sender
      server.to(socket.id).emit('private message', 'Hello: ' + msg);
    });
  });

};

module.exports = { listen };