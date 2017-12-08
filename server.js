var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');



const RAIDGROUP;

var mDB = require('mongodb').MongoClient;
mDB.connect(process.env.MONGODB_URI, (err, database) => {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      for (let user in table[row]['members'];) {
        RAIDGROUP[user]=table[row]['members'][user];
      }
    }
});


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});

io.on('connection', function(socket) {
  console.log('connect');
  io.emit('raid-group', RAIDGROUP);

  socket.on('disconnect', function() {
    console.log('disconnect');
  });
});

http.listen(app.get('port'), function() {
  console.log('listening on *:' + app.get('port'));
});
