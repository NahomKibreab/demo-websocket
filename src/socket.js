const socketio = require('socket.io');

const users = {};
let connected = 0;

const getUser = function(id) {
  for (const user in users) {
    if (users[user] === id) {
      return user;
    }
  }
};

// Web socket connection listener
const start = function(httpServer) {

  const server = socketio(httpServer);

  // Can use a closure.  server is remembered
  const sendStatus = function() {
    const active = Object.keys(users).length;
    const status = { connected, active };
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

      const user = getUser(socket.id);
      if (user) {
        delete users[user];
      }
      sendStatus();
    });

    // Handle an "offline" message
    socket.on('register', name => {
      console.log("register: ", name);

      const user = getUser(socket.id);
      if (user) {
        return server.to(socket.id).emit('notify', `You are already registered!`);
      }

      if (users[name]) {
        return server.to(socket.id).emit('notify', 'This name is already registered!');
      }

      // Add user
      users[name] = socket.id;
      console.log(users);
      server.to(socket.id).emit('notify', `Registered as: ${name}`);
      sendStatus(server);

      console.log(users);
    });

    // Handle an "offine" message (only gets socket.id)
    socket.on('offline', () => {
      console.log("offine: ", socket.id);

      // Find user
      const user = getUser(socket.id);
      if (!user) {
        return server.to(socket.id).emit('notify', `Not Registered`);
      }

      delete users[user];
      console.log(users);
      server.to(socket.id).emit('notify', `Offline ( ${user} )`);
      sendStatus(server);
    });


  });

};

module.exports = { start };