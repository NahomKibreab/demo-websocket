(($) => {    // Wraps everything in an IIFE, also protects `$` operator 

  $(function () {
    const socket = setupSocket();;

    $("#send").on('click', function (event) {
      const to = $("#to").val();
      const from = $("#name").val();
      const message = $("#input").val();
      send(socket, message, from, to);
    });

    $("#clear").on('click', function (event) {
      $("#messages").empty();
    });

    $("#register").on('click', function (event) {
      const name = $("#name").val();
      register(socket, name);
    });

  });

  // Send chat message to the server
  const send = function (socket, text, from, to) {
    // console.log(from, to, text);
    if (socket && from && text) {
      socket.emit('chat', { text, from, to });
    }
  };

  // Send a register message to the server
  const register = function (socket, name) {
    console.log("register");
    if (socket && name) {
      socket.emit('register', name);    // Send a 'register' event
    }
  };

  // Create socket and add listeners
  const setupSocket = function () {

    // "io" comes from the included socket.io file (index.html)
    const socket = io();
    socket.on('connect', event => {
      console.log("connected");

      // Send empty message with our name when we connect
      send(socket, { from: 'test' });
    });

    // Custom socket.io Messages can have different event names
    socket.on('public', function (msg) {
      $("#messages").prepend(`<li>Broadcast: ${msg}</li>`);
    });

    // We can handle messages by name 
    socket.on('private', function (msg) {
      $("#messages").prepend(`<li class="private">${msg}</li>`);
    });

    // We can also handle messages sent with no message name
    socket.on('message', function (msg) {
      $("#messages").prepend(`<li class="send">${msg}</li>`);
    });

    // We can also handle messages sent with no message name
    socket.on('ack', function (msg) {
      $("#messages").prepend(`<li class="ack">>> ${msg}</li>`);
    });

    return socket;
  };
})(jQuery);
