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


    // Do something whenever a "chat message" message is received
    socket.on('chat message', msg => {

      // Broadcast received message to all 
      server.emit('public message', 'emit() ' + msg);

      // Send private message back to the sender (by socket id)
      server.to(socket.id).emit('private message', 'to() ' + msg);

      // Send generic "message" to this socket only (no custom name)
      socket.send("send() " + msg);
    });
  });

};

module.exports = { listen };