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

    // Handle a "register" event
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

  });
};

module.exports = { start };