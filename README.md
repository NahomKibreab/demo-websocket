# demo.websocket

Simple websocket chat app using socket.io module. To test, start server: `npm start` and open two browsers at `http://localhost:8002/`

- Messages sent from a browser will be broadcast to all
- A "private" message will also be sent to the sender browser only (twice. custom & generic)
- socket.io is preferred over using websockets directly as it provides mode protection
- can have custom messages (more flexible) or generic messages 
