// Wraps everything in an IIFE, also protects `$` operator 
($ => {

  $(function() {
    const socket = setupSocket();

    $("#active").on('click', function() {
      const name = $("#name").val();
      register(socket, name);
    });

    $("#offline").on('click', function() {
      const name = $("#name").val();
      offline(socket);
    });

    $("#send").on('click', function(event) {
      send(socket);
    });

    $("#clear").on('click', function(event) {
      $("#messages").empty();
    });


  });

  // Create socket and add listeners
  const setupSocket = function() {

    // "io" comes from the included socket.io file (index.html)
    const socket = io();
    socket.on('connect', event => {
      console.log("connected");
    });


    // Messages can have different event names
    // handle "notify" events (from server to us)
    socket.on('notify', function(msg) {
      $(".notify").html(msg);
    });

    // handle "status" events
    socket.on('status', function(msg) {
      console.log(msg);
      $(".connected").html(msg.connected);
      $(".active").html(msg.active);
    });

    // handle "message" events
    socket.on('private', function(msg) {
      console.log(msg);
      $("#messages").prepend(`<li class="private">${msg.from} says: ${msg.text}</li>`);
    });

    // handle "message" events
    socket.on('public', function(msg) {
      console.log(msg);
      $("#messages").prepend(`<li class="public">${msg.from} says: ${msg.text}</li>`);
    });

    return socket;
  };

  // Send a register event to the server
  const register = function(socket, name) {
    console.log("register", name);
    if (socket && name) {
      socket.emit('register', name);
    }
  };

  // Send an offline event to the server
  const offline = function(socket) {
    console.log("offline");
    if (socket) {
      socket.emit('offline', null);
    }
  };

  // Send chat message to the server
  const send = function(socket) {
    const to = $("#to").val();
    const text = $("#message").val();
    console.log("send:", to, text);
    if (socket && text) {
      socket.emit('chat', { text, to });
    }
  };

})(jQuery);
