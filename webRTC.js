const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'], 
  credentials: true 
}));
const server = http.createServer(app);
const PORT = 3000;
const io = socketIO(server);
  

io.on('connection', (socket) => {
  console.log('A user connected with ID:',socket.id);

  socket.on('offer', (data) => {
    // Forward the offer to the other connected peer(s)
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    // Forward the answer to the other connected peer(s)
    console.log("answer: ",data);
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    // Forward the ICE candidate to the other connected peer(s)
    console.log(data);
    socket.broadcast.emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
