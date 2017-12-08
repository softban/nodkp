const express = require('express');
const path = require('path');

// Testing Data
var MDB = [
  {
    "raid": "unicorn",
    "active": true,
    "members": {
        "softban": 2,
        "twatuser": 0
    }
  },
  {
    "raid": "paragon",
    "active": true,
    "members": {
        "softban": 5,
        "twatuser": 6
    }
  }
];

/* Mongo Database Import Section - WORKING!
const DATA = [];

var mDB = require("mongodb").MongoClient;
mDB.connect(process.env.MONGODB_URI, (err, database) => {
  var collection = database.collection("raid-groups");
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      DATA.push(table[row]);
    }
  });
});
*/
const server = express()
  .set('view engine', 'pug')
  .use((req, res) => res.render(path.join(__dirname, 'index.pug'), {
      title: "Hello",
      message: "World",

      database: DATA,

      logInput: () => {
        console.log('input-enter')
      }
  }))
  .listen(process.env.PORT, () => console.log(`[!] listening on ${process.env.PORT}`));
