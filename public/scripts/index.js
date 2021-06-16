(($) => {    // Wraps everything in an IIFE, also protects `$` operator 

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

    // "io" comes from the included socket.io file (index.html)
    const socket = io();
    socket.on('connect', event => {
      console.log("connected");
    });

    // Custom socket.io Messages can have different event names
    socket.on('public message', function (msg) {
      $("#messages").prepend(`<li>Broadcast: ${msg}</li>`);
    });

    // We can handle messages by name 
    socket.on('private message', function (msg) {
      $("#messages").prepend(`<li class="private">Received: ${msg}</li>`);
    });

    // We can also handle messages sent with no message name
    socket.on('message', function (msg) {
      $("#messages").prepend(`<li class="send">Received: ${msg}</li>`);
    });

    return socket;
  };
})(jQuery);
