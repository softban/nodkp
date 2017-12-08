const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const RAIDGROUP = {};

const server = express()
  .use((req, res) => res.sendFile(path.join(__dirname, 'view/index.html')) )
  .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

const io = socketIO(server);

var mDB = require('mongodb').MongoClient;
mDB.connect(process.env.MONGODB_URI, (err, database) => {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      for (let user in table[row]['members']) {
        RAIDGROUP[user]=table[row]['members'][user];
      }
    }
  });
});

io.on('connection', (socket) => {
  console.log('[+] client connected.');
  io.emit('display-raid', RAIDGROUP);
  socket.on('disconnect', () => console.log('[-] client disconnected.'));
});
