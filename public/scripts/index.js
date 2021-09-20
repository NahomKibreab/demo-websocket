(($) => {    // Wraps everything in an IIFE, also protects `$` operator 

  $(function() {
    const socket = setupSocket();;

    $("#send").on('click', function(event) {
      send(socket);
    });

    $("#clear").on('click', function(event) {
      $("#messages").empty();
    });

    $("#active").on('click', function(event) {
      active(socket);
    });

    $("#offline").on('click', function(event) {
      offline(socket);
    });

  });

  // Send chat message to the server
  const send = function(socket) {
    const to = $("#to").val();
    const from = $("#name").val();
    const text = $("#message").val();
    // console.log(from, to, text);
    if (socket && from && text) {
      socket.emit('chat', { text, from, to });
    }
  };

  // Send a register message to the server
  const active = function(socket) {
    const name = $("#name").val();
    if (socket && name) {
      socket.emit('active', name);    // Send an 'active' event
    }
  };

  // Send a register message to the server
  const offline = function(socket) {
    console.log("offline");
    socket.emit('offline', "");    // Send an 'offline' event
  };

  // Create socket and add listeners
  const setupSocket = function() {

    // "io" comes from the included socket.io file (index.html)
    const socket = io();
    socket.on('connect', event => {
      console.log("connected");
    });

    // Custom socket.io Messages can have different event names
    // handle "ack" events
    socket.on('ack', function(msg) {
      $(".message").html(msg);
    });

    // handle "public" (broadcast) events
    socket.on('public', function(msg) {
      $("#messages").prepend(`<li>Broadcast: ${msg}</li>`);
    });

    // handle "private" events
    socket.on('private', function(msg) {
      $("#messages").prepend(`<li class="private">${msg}</li>`);
    });

    // handle "status" events
    socket.on('status', function(msg) {
      console.log(msg);
      $(".connected").html(msg.connected);
      $(".registered").html(msg.registered);
    });

    // We can also handle messages sent with no event name (send as message)
    socket.on('message', function(msg) {
      $("#messages").prepend(`<li class="send">${msg}</li>`);
    });

    return socket;
  };

})(jQuery);
