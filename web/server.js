const express = require('express');
const path = require('path');

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

const server = express()
  .set('view engine', 'pug')
  .use((req, res) => res.render(path.join(__dirname, 'index.pug'), {
      title: "Hello",
      message: "World",

      database: MDB,

      logInput: () => {
        console.log('input-enter')
      }
  }))
  .listen(process.env.PORT, () => console.log(`[!] listening on ${process.env.PORT}`));
