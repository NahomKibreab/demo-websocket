const socketio = require('socket.io');

const users = {};

// Web socket connection listener
const start = function (httpServer) {

  const server = socketio(httpServer);

  server.on('connection', (socket) => {
    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We can save the ID's and associate with a specific used
    console.log("connected:  ", socket.id);

    socket.on('disconnect', () => {
      console.log("disconnect: ", socket.id);

      // unregister this user
      for (const user in users) {
        if (users[user] === socket.id) {
          console.log("unregistering ", user);
          delete users[user];
        }
      }

      console.log(users);
    });

    // Handle a "register" message
    socket.on('register', name => {
      console.log("register: ", name);

      if (users[name]) {
        server.to(socket.id).emit('ack', 'You are already registered!');
        return;
      }

      // Add user
      users[name] = socket.id;
      console.log(users);
      server.to(socket.id).emit('ack', 'You are now registered!');
    });

    // Do something whenever a "chat" event is received
    socket.on('chat', msg => {
      console.log("message: ", msg);

      // Broadcast received message to all if no "to" received
      if (!msg.to) {
        server.emit('public', msg.text);
        return;
      }

      const destSocket = users[msg.to];
      if (!destSocket) {
        server.to(socket.id).emit('ack', msg.to + ' is not online');
        return;
      }

      server.to(destSocket).emit('private', msg.from + ' says: ' + msg.text);

      // Send private message back to the sender (by socket id)
      server.to(socket.id).emit('ack', 'you sent: ' + msg.text);

      // Alternative: Send generic "message" to this socket only (no  event nanme)
      // socket.send("send() " + msg.text);
    });
  });

};

module.exports = { start };