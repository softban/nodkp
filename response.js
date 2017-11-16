module.exports = {

  initiate: (discord, message) => {
    let embed = new discord.RichEmbed()
      .setTitle('nodkp')
      .setColor('#d1f442')
      .setThumbnail("https://cdn2.iconfinder.com/data/icons/helmet/512/warrior-soldier-helmet-war-512.png")
      .setDescription(
          `**${message.author.username}** created **${message.channel.name}** raid group!\n\n`+
          `Hello I am nodkp! I am here to assist with dkp management. Below are the commands available. All raid leaders must have a rank named 'Raid Leader' to use leader commands.\n`+
          `\n - *developed by* [*Softban*](https://github.com/softban/nodkp)`
      )
      .addBlankField(true)
      .addField('start', '(**leader**) *Starts the raid, allowing players to join. After 15 minutes, the raid will begin and 1dkp will be awarded for all players ontime.*')
      .addField('end', '(**leader**) *Ends the raid, disables commands, and resets ontime for next raid.*')
      .addField('award [int]', '(**leader**) *Requires an amount, (@bot award 10). Awards all players who have join the raid with the specified amount.*')
      .addField('display', '(**leader**) *Show entire raids balance.*')
      .addField('check', '(**leader**) *Show number of players joined.*')
      .addField('auction', '(**leader**) *Start a new auction.*')
      .addField('gavel', '(**leader**) *End current auction, winning player will have dkp deducted for item.*')
      .addBlankField(true)
      .addField('join', '(**player**) *Joins the raid.*')
      .addField('balance', '(**player**) *Show personal dkp balance.*')
      .addField('bid [int]', '(**player**) *Requires an amount, (@bot bid 10). Allows players to bid their dkp for current auction item.*')
      .addBlankField(true)
      .setTimestamp();
    return embed;
  },

  join: (discord, message) => {
    let embed = new discord.RichEmbed()
      .setColor('#41f4bb')
      .setDescription(`**${message.author.username}** has joined!\n`);
    return embed;
  },

  raidStart: (discord, message) => {
    let embed = new discord.RichEmbed()
      .setColor('#abfca6')
      .setDescription(`**${message.channel.name}** raid will being in **15 minutes**!`);
    return embed;
  },

  raidReady: (discord, message) => {
    let embed = new discord.RichEmbed()
      .setColor('#4cf441')
      .setDescription(`**${message.channel.name}** raid has begun!`);
    return embed;
  },

  raidEnd: (discord, message) => {
    let embed = new discord.RichEmbed()
      .setColor('#e56791')
      .setDescription(`**${message.channel.name}** raid has ended!`);
    return embed;
  },

  award: (discord, message, option) => {
    let embed = new discord.RichEmbed()
      .setColor('#ffb06b')
      .setDescription(`**${message.channel.name}** raiders have been awarded **${option}**!`);
    return embed;
  },

  raidBalance: (discord, message, balance) => {
    let embed = new discord.RichEmbed()
      .setColor('#b2fff5')
      .setDescription(`balance: **${balance}**`);
    return embed;
  },

  raidDisplay: (discord, message, view) => {
    let embed = new discord.RichEmbed()
      .setTitle('DKP Balance')
      .setColor('#67f7e6')
      .setDescription(`${view}`)
      .setTimestamp();
    return embed;
  },

  auction: (discord) => {
    let embed = new discord.RichEmbed()
      .setColor('#c384ff')
      .setTitle(`Auction has begun, now accepting bids!`);
    return embed;
  },

  gavel: (discord, message, player) => {
    let embed = new discord.RichEmbed()
      .setTitle(`Auction has ended!`)
      .setColor('#c384ff')
      .setDescription(`**${player}** has won the auction!`);
    return embed;
  },

  newBid: (discord, message, option) => {
    let embed = new discord.RichEmbed()
      .setTitle('Highest Bid')
      .setColor('#c384ff')
      .setDescription(`**${message.author.username}** ${option}`);
    return embed;
  }
}
