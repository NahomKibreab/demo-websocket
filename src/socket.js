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

    // Handle a "register" message
    socket.on('register', name => {
      console.log("register: ", name);

      if (users[name]) {
        return server.to(socket.id).emit('notify', 'You are already online!');
      }

      // Add user
      users[name] = socket.id;
      console.log(users);
      server.to(socket.id).emit('notify', `Registered ( ${name} )`);
      sendStatus(server);
    });


  });





};

module.exports = { start };