const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const chain = require('./src/chain.js');
const memory = require('./src/memory.js');
const Group = require('./src/group.js');

var token = fs.readFileSync('appToken.config', 'utf8');
if (token === undefined || token === '') throw 'BAD TOKEN';

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.author.username === 'Ginny') return; //Temporary
	if (msg.content === 'status') {
		msg.reply(
			memory.data.groups.map(group => group.id + ' ' + group.count)
		);
		return;
	}
	if (msg.content === 'purge channel') {
		msg.channel
			.fetchMessages()
			.then(messages =>
				messages.forEach(m =>
					m
						.delete()
						.then()
						.catch()
				)
			)
			.catch();
		return;
	}
	chain.process(msg.content);
	// if (msg.content === 'ping') {
	// 	msg.reply('pong');
	// }
});

client.login(token);

setInterval(function() {
	memory.save();
}, 3 * 60 * 1000); //3 minutes
