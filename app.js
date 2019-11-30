// Calling the package
var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');
var profanities = require('profanities')

// Second, lets call the file we just made using fs.
var userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));
var commandsList = fs.readFileSync('storage/commands.txt', 'utf8');

// Functions
function userInfo(user) {
  var finalString = '';

  // Name
  finalString += '**' + user.username + '**, with the **ID** of **' + user.id + '**';

  var userCreated = user.createdAt.toString().split(' ');
  finalString += ', the account was **created on ' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**.'

  // Messages Sent
  finalString += ' Since then, they have **sent ' + userData[user.id].messagesSent + ' messages** to this Discord server.'

  return finalString;
}

// Listener Event: Message Recieved ( This will run every time a message is recieved)
bot.on('message', message => {


  // Variables
  var sender = message.author; // The person who sent the message
  var msg = message.content.toUpperCase(); // Takes the message and makes it all uppercase
  var prefix = '$' // The text before commands

  // Profanity
  for (x = 0; x < profanities.length; x++) {
    if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
      message.channel.send('Please refrain from using profound language!')
      message.delete();
      return;
    }
  }


  if (sender.id === '644008636783525898') {
    return;
  }

  if (msg === prefix + 'HELP' || msg === prefix + 'COMMANDS') {
    message.delete()
    message.author.send(commandsList)
    }

  // Ping / Pong commands
  if (msg === prefix + 'PING') {
    message.channel.send({embed:{
        title:"Pong!",
        color: 0x00a5ff
    }})
  }

  if (msg === prefix + 'IP') {
    message.delete()
    message.channel.send({embed:{
        title:"Server IP:",
        description:"185.249.196.14:32006",
        color: 0x00a5ff
    }})
  }

  if (msg === prefix + 'RULES') {
    message.delete()
    message.channel.send({embed:{
        title:"Click for Server Rules",
        url:"https://docs.google.com/document/d/1Kv7aFYPWHzsXTG6sn6zQTGsGsDBT6MaQ9RceX-MZ1k8/edit?usp=sharing",
        color: 0x00a5ff
    }})
  }

  if (msg === prefix + 'TEAMSPEAK') {
    message.delete()
    message.channel.send({embed:{
        title:"Teamspeak IP:",
        description: "Voice.canada1.pingperfect.com:9991",
        color: 0x00a5ff
    }})
  }


  if (msg === prefix + 'AUTHOR') {
    message.delete()
    message.channel.send({embed:{
      title:"Made By:",
      description:"Cyphiin",
      url:"https://www.youtube.com/channel/UCebVT0V59eclVe1i848oFaA",
      color: 0xA569BD
    }})
  }

  // Banned Words
if (msg.includes('NIGGER')){
  message.delete()
  message.author.send('A word you attempted to send to the server is not allowed. Please refrain from using that language.')
}

  // User data code
  if (!userData[sender.id]) userData[sender.id] = {
    messagesSent: 0
  }

  if (msg.startsWith(prefix + 'USERINFO')) {
    if (msg === prefix + 'USERINFO') {
      message.channel.send(userInfo(sender));
    }
  }


  userData[sender.id].messagesSent++;

fs.writeFile('storage/userData.json', JSON.stringify(userData), (err) => {
  if (err) console.error(err);
});

});

// Listener Event: Bot Launched
bot.on('ready', () => {
  console.log('Success! The bot is now online!')

// You can put any code you want here. It will run when you turn on the bot.

// Setting status

bot.user.setStatus('dnd')

bot.user.setGame('SoCal RP')

});

// Listener Event: Giving Roles upon join
bot.on('guildMemberAdd', member => {

  console.log('User ' + member.user.username + ' has joined the server!')

  var role = member.guild.roles.find('name', 'Member');
  member.addRole(role)

  // Sending a message when someone joins/leaves
  member.guild.channels.get('647557740830523392').send('**' + member.user.username + '**, has joined the server! Give \'em a warm welcome!')

})

// Leaving
// listener Event: User leaving.

// Login
bot.login('process.env.BOT_TOKEN') // Don't let people see this code
