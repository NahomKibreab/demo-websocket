// Wraps everything in an IIFE, also protects `$` operator 
($ => {

  $(function() {
    const socket = setupSocket();

    $("#register").on('click', function(event) {
      const name = $("#name").val();
      register(socket, name);
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
    });

    return socket;
  };

  // Send a register message to the server
  const register = function(socket, name) {
    console.log("register");
    if (socket && name) {
      socket.emit('register', name);
    }
  };

})(jQuery);
