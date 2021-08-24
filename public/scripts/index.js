(($) => {    // Wraps everything in an IIFE, also protects `$` operator 

  $(function () {
    const socket = setupSocket();;

    $("#register").on('click', function (event) {
      const name = $("#name").val();
      register(socket, name);
    });

  });

  // Create socket and add listeners
  const setupSocket = function () {

    // "io" comes from the included socket.io file (index.html)
    const socket = io();
    socket.on('connect', event => {
      console.log("connected");
    });

    return socket;
  };

  // Send a register message to the server
  const register = function (socket, name) {
    console.log("register");
    if (socket && name) {
      socket.emit('register', name);    // Send a 'register' event
    }
  };

})(jQuery);
