$(function () {

  const socket = setupSocket();

  $("#send").on('click', function (event) {
    send(socket, $("input").val());
  });

  $("#clear").on('click', function (event) {
    $("#messages").empty();
  });
});

// Send message to the server
const send = function (socket, text) {
  if (text) {
    socket.emit('chat message', text);
  }
};

// Create socket and add listeners
const setupSocket = function () {
  const socket = io();    // "io" comes from the included socket.io file
  socket.on('connect', event => {
    console.log("connected");
  });

  // Messages can have different event names
  socket.on('public message', function (msg) {
    $("#messages").append(`<li>${msg}</li>`);

  }); socket.on('private message', function (msg) {
    $("#messages").append(`<li>Private: ${msg}</li>`);
  });

  return socket;
};
