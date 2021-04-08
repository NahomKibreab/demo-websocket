$(function () {
  const socket = setupSocket();

  $("#send").on('click', function (event) {
    send(socket, $("input").val());
  });
});

const send = function (socket, text) {
  if (text) {
    socket.emit('chat message', text);
  }
};

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
