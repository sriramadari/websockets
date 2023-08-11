const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = 8080;
const io = socketIO(server, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });
  

  app.use(express.static(__dirname + '/public')); // Assuming your frontend files are in the "public" directory


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('offer', (data) => {
    // Forward the offer to the other connected peer(s)
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    // Forward the answer to the other connected peer(s)
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    // Forward the ICE candidate to the other connected peer(s)
    socket.broadcast.emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
