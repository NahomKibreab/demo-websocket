const socketio = require('socket.io');

// Web socket connection listener
const listen = function (server) {
  io = socketio(server);

  io.on('connection', (socket) => {
    // This socket param is the sending socke. Has a unique ID
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

module.exports = { listen };