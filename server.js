
const path = require('path');
const express = require('express');
const server = express();

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.get("/", function(req, res) {
 res.send("Heroku Demo!");
});

server.listen(process.env.PORT);
console.log(`[+] listening on ${process.env.PORT}`);
