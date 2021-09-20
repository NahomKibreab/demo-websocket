const socketio = require('socket.io');

const users = {};
let connected = 0;

const sendStatus = function(server) {
  const registered = Object.keys(users).length;
  const status = { connected, registered };
  server.emit('status', status);
};

const offline = function(id) {
  // unregister this user
  for (const user in users) {
    if (users[user] === socket.id) {
      console.log("offline: ", user);
      delete users[user];
    }
  }
};

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

  server.on('connection', (socket) => {
    connected++;

    // This socket param is the sending socket. Has a unique ID (socket.id)
    // We can save the ID's and associate with a specific used
    console.log("connected:  ", socket.id);
    server.to(socket.id).emit('status', `Connected ( ${socket.id} )`);
    sendStatus(server);

    socket.on('disconnect', () => {
      connected--;
      console.log("disconnect: ", socket.id);

      const user = getUser(socket.id);
      if (user) {
        delete users[user];
      }
      sendStatus(server);
    });

    // Handle a "register" message
    socket.on('active', name => {
      console.log("active: ", name);

      if (users[name]) {
        server.to(socket.id).emit('status', 'You are already active!');
        return;
      }

      // Add user
      users[name] = socket.id;
      console.log(users);
      server.to(socket.id).emit('status', `Registered ( ${name} )`);
      sendStatus(server);
    });

    // Handle an "offine" message (only gets socket.id)
    socket.on('offline', name => {
      console.log("offine: ", socket.id);

      // Find user
      const user = getUser(socket.id);
      if (!user) {
        server.to(socket.id).emit('status', `Offline ( ${name} )`);
        return;
      }

      delete users[user];
      console.log(users);
      server.to(socket.id).emit('status', `Offline ( ${user} )`);
      sendStatus(server);
    });

    // Do something whenever a "chat" event is received
    socket.on('chat', msg => {
      console.log("message: ", msg);

      // Broadcast received message to all if no "to" received
      if (!msg.to) {
        server.emit('public', msg.text);
        server.to(socket.id).emit('status', 'Broadcast: ' + msg.text);
        return;
      }

      // Find socket id for this user, if exists
      const destSocket = users[msg.to];
      if (!destSocket) {
        server.to(socket.id).emit('status', msg.to + ' is not active');
        return;
      }

      server.to(destSocket).emit('private', msg.from + ' says: ' + msg.text);

      // Send confirmation message back to the sender (by socket id)
      server.to(socket.id).emit('status', 'Sent: ' + msg.text);

      // Alternative: Send generic "message" event to this socket only (no event name provided)
      // socket.send("msg.text);
    });
  });

};

module.exports = { start };