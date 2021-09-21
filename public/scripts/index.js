// Wraps everything in an IIFE, also protects `$` operator 
($ => {  

  $(function() {
    const socket = setupSocket();

  });

  // Create socket and add listeners
  const setupSocket = function() {

    // "io" comes from the included socket.io file (index.html)
    const socket = io();
    socket.on('connect', event => {
      console.log("connected");
    });

    return socket;
  };
  
})(jQuery);
