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
  const socket = io();
  socket.on('connect', event => {
    console.log("connected");
  });

  socket.on('chat message', function (msg) {
    $("#messages").append(`<li>${msg}</li>`);
  });

  return socket;
};
