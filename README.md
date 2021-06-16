# demo.websocket

Simple chat app using socket.io module. To test, start server: `npm start` and open two browsers at `http://localhost:8002/`

- Messages sent from a browser will be broadcast to all
- A "private" message will also be sent to the sender browser only (twice. custom & generic)
- The 2nd browser will only see broadcast messages
- socket.io is preferred over using websockets directly as it provides more protection & flexibility
- can have custom messages (more flexible) or generic messages 
- note that  socket.io is NOT compatible with regular websockets clients or servers. Both ends must use socket.io
