# demo.websocket

Simple chat app using socket.io module. To run, start server: `npm start` and open two browsers at `http://localhost:8002/`

- Users can Register with their name
- Private messages can be sent to registered users
- Public messages can be broadcast to all connected users
- Note that  socket.io is NOT compatible with regular websockets clients or servers. Both ends must use socket.io

To see the steps in the development of this app, checkout the branches, starting with "1-connect'