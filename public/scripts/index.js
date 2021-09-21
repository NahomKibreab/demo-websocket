// Wraps everything in an IIFE, also protects `$` operator 
($ => {

  $(function() {
    const socket = setupSocket();

    // Not really needed since browser will disconnect anyway
    $(window).unload(function() {
      socket.disconnect();
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
})(jQuery);
