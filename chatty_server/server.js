// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  broadcast(JSON.stringify({
    numberOfClients: wss.clients.length,
    type: "clientNotification"
  }));
  console.log('Client connected');

  socket.on('message', function incoming(msg) {
    let message = JSON.parse(msg);
    switch (message.type) {
      case "postMessage":
        message.id = uuid.v4()
        message.type = "incomingMessage"
        broadcast(JSON.stringify(message));
        break;
      case "postNotification":
        message.type = "incomingNotification"
        broadcast(JSON.stringify(message));
        break;
    }
  });

  function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

  // Set up a callback for when a client closes the socket. This usually means they closed their brosocketer.
  socket.on('close', () =>
    console.log('Client disconnected'));
});