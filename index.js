
/* Variables */
const discord = require('discord.js');

const discord_api_token = process.env.DISCORD_TOKEN;
const client = new discord.Client();
const ontime = {};
const available = [];

const market = {};

const response = require('./response');

function load_available(database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {available.push(table[row]['raid'])}
  });
}


/* Blocks */
function initiate_raid(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {

    for (let row in table) {if (table[row]['raid'] === message.channel.name){return}}
    collection.insertMany([{raid:message.channel.name,'active':false,members:{}}]);
    available.push(message.channel.name);
  });

  message.channel.send(response.initiate(discord, message)).then(msg => {
    msg.pin()
  });;
}

function join_raid(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name) {

        let raid_members = table[row]['members'];
        for (let user in raid_members) {if (user === message.author.username) {return}}

        raid_members[message.author.username] = 0;
        collection.updateOne({'raid': message.channel.name}, { $set:{'members':raid_members }});
      }
    }
  });

  if (ontime[message.channel.name] === false) {return}
  for (let user in ontime[message.channel.name]) {if (user === message.author.username) {return}}
  ontime[message.channel.name].push(message.author.username);

  message.channel.send(response.join(discord, message));
}

function start_raid(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] === false && table[row]['raid'] === message.channel.name) {
        collection.updateOne({'raid': message.channel.name}, { $set:{'active':true }});
        ontime[message.channel.name]=[message.author.username];

        setTimeout(() => {
          message.channel.send(response.raidReady(discord, message));
          award(message, database, 1);
        }, (15*60000));
      }
    }
  });

  message.channel.send(response.raidStart(discord, message));
}

function end_raid(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name){
        collection.updateOne({'raid': message.channel.name}, { $set:{'active':false }});
        ontime[message.channel.name] = false;
      }
    }
  });

  message.channel.send(response.raidEnd(discord, message));
}

function award(message, database, option) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name && option > 0) {
        let raid_members = table[row]['members'];
        for (let user in raid_members) {if (ontime[message.channel.name].indexOf(user) > -1) {raid_members[user] += parseInt(option)}}
        collection.updateOne({'raid': message.channel.name}, { $set:{'members':raid_members }});

        message.channel.send(response.award(discord, message, option));
      }
    }
  });
}

function balance(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name) {
        for (let user in table[row]['members']) {if (message.author.username === user) {
          message.author.send(response.raidBalance(discord, message, table[row]['members'][user]));
        }}
      }
    }
  });
}

function display(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {

    var active = {};
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name) {
        for (let user in table[row]['members']) {active[user] = table[row]['members'][user]}
      }
    }

    var view = ''; for (let user in active) {if (ontime[message.channel.name].indexOf(user) > -1) {view = view + `\n**${active[user]}** *${user}*`}}
    message.channel.send(response.raidDisplay(discord, message, view));
  });
}

function check(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name) {
        let embed = new discord.RichEmbed()
          .setColor('#fc0294')
          .setDescription(`**${ontime[message.channel.name].length}** players have joined!`);
        message.channel.send({embed});
      }
    }
  });
}


function deduct(message, database, player, option) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name) {
        let raid_members = table[row]['members'];
        for (let user in raid_members) {if (ontime[message.channel.name].indexOf(user) > -1 && player === user) {raid_members[user] -= parseInt(option)}}
        collection.updateOne({'raid': message.channel.name}, { $set:{'members':raid_members }});
      }
    }
  });
}

function auction(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] === true && table[row]['raid'] === message.channel.name) {

        market[message.channel.name] = {'active':true, 'player': message.author.username, 'bid':0}
        message.channel.send(response.auction(discord));

      }
    }
  });
}

function gavel(message, database) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] === true && table[row]['raid'] === message.channel.name && market[message.channel.name].active) {

        market[message.channel.name].active = false;
        deduct(message, database, market[message.channel.name].player, market[message.channel.name].bid);

        message.channel.send(response.gavel(discord, message, market[message.channel.name].player));
      }
    }
  });
}

function bid(message, database, option) {
  var collection = database.collection('raid-groups');
  collection.find({}).toArray((err, table) => {
    for (let row in table) {
      if (table[row]['active'] && table[row]['raid'] === message.channel.name && market[message.channel.name].active) {
        let raid_members = table[row]['members'];
        for (let user in raid_members) {if (ontime[message.channel.name].indexOf(user) > -1 && message.author.username === user) {
          if (parseInt(option) <= parseInt(raid_members[user]) && parseInt(option) > market[message.channel.name].bid) {
            market[message.channel.name].player = message.author.username;
            market[message.channel.name].bid = parseInt(option);

            message.channel.send(response.newBid(discord, message, option));
          }
        }}
      }
    }
  });
}


/* Handler */
var mDB = require('mongodb').MongoClient;
mDB.connect(process.env.MONGODB_URI, (err, database) => {

  client.on('ready', () => {
    load_available(database);
    console.log('nodkp-initiated');
  });

  client.on("presenceUpdate", (userold, usernew) => {
    if (userold.presence.status === 'offline' && usernew.presence.status === 'online') {
      console.log('presence-update');
    }
  });

  client.on('message', (message) => {
    if (message.author.bot) {return;}
    if (message.isMentioned(client.user) && message.channel.type === 'text') {
      var option = message.content.split(' ');

      if (message.member.roles.some(r=>['Raid Leader'].includes(r.name)) === true) {
        if (option[1] === 'init') {initiate_raid(message, database)}
      }
      if (available.indexOf(message.channel.name) > -1) {
        if (option[1] === 'join') {join_raid(message, database)}
        if (option[1] === 'balance') {balance(message, database)}
        
        if (option[1] === 'bid') {bid(message, database, option[2])}

        if (message.member.roles.some(r=>['Raid Leader'].includes(r.name)) === true) {
          if (option[1] === 'start') {start_raid(message, database)}
          if (option[1] === 'end') {end_raid(message, database)}
          if (option[1] === 'award') {award(message, database, option[2])}
          if (option[1] === 'display') {display(message, database)}
          if (option[1] === 'check') {check(message, database)}

          if (option[1] === 'auction') {auction(message, database)}
          if (option[1] === 'gavel') {gavel(message, database)}

        }
      }

      message.delete();
    }
  });

  client.login(discord_api_token);
});
