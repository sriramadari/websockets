const { error } = require('console');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Create an instance of Express app and an HTTP server
const app = express();
const server = http.createServer(app);

// // Create a WebSocket Server using the HTTP server
const wss = new WebSocket.Server({ server });


// // Serve your MERN app here, if needed
// // app.use(express.static('your-mern-app-folder'));

// Event handler for when a new WebSocket connection is established
wss.on('connection', (ws,req) => {
  console.log('Client connected');

  // Event handler for when a message is received from a client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Send a response message back to the client
    ws.send(`You sent: ${message}`);
  });

  // Event handler for when the connection is closed by the client
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
