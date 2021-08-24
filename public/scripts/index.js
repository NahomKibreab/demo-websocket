(($) => {    // Wraps everything in an IIFE, also protects `$` operator 

  $(function () {
    const socket = setupSocket();;

    $("#send").on('click', function (event) {
      send(socket);
    });

    $("#clear").on('click', function (event) {
      $("#messages").empty();
    });

    $("#register").on('click', function (event) {
      register(socket);
    });

  });

  // Send chat message to the server
  const send = function (socket) {
    const to = $("#to").val();
    const from = $("#name").val();
    const text = $("#message").val();
    // console.log(from, to, text);
    if (socket && from && text) {
      socket.emit('chat', { text, from, to });
    }
  };

  // Send a register message to the server
  const register = function (socket) {
    console.log("register");
    const name = $("#name").val();
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
    });
    
    // Custom socket.io Messages can have different event names
    // handle "ack" events
    socket.on('ack', function (msg) {
      $("#messages").prepend(`<li class="ack">>> ${msg}</li>`);
    });
    
    // handle "public" (broadcast) events
    socket.on('public', function (msg) {
      $("#messages").prepend(`<li>Broadcast: ${msg}</li>`);
    });

       // handle "private" events
    socket.on('private', function (msg) {
      $("#messages").prepend(`<li class="private">${msg}</li>`);
    });

    // We can also handle messages sent with no message name
    socket.on('message', function (msg) {
      $("#messages").prepend(`<li class="send">${msg}</li>`);
    });

    return socket;
  };

})(jQuery);
