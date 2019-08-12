//! npm i forever
//! forever start ginny

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const chain = require('./src/chain.js');
const memory = require('./src/memory.js');
const Group = require('./src/group.js');
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
	projectId: 'ginny-0',
	keyFilename: 'ginny-cd578de10076.json',
});

const docMetadata = firestore.doc('memory/metadata');

// Enter new data into the document.
docMetadata
	.set(
		{
			lastStart: Date.now(),
		},
		{ merge: true }
	)
	.then(() => {
		// Document created successfully.
	});
docMetadata.get().then(doc => {
	console.log(doc.get('lastStart'));
});

//To be addressed later. This can technically import all of the stories and parse them correctly.
//When building trees from entire stories, JSON.stringify breaks trying to traverse that deep.
//When building smaller word groups, JSON.stringify breaks trying to handle an array that large.
const litImp = require('./src/dataimport/literImporter.js');
const fileIO = require('./src/dataimport/file-io.js');

litImp.baseDirectory = fileIO.readDir(litImp.datasetDirPath);
litImp.getCategories();
litImp.getStories();
var totalStories = litImp.stories.length;

litImp.stories.forEach((story, index) => {
	chain.process(story.read());
	if (index % 100 === 0 || index + 1 === totalStories) {
		console.log(
			`Processed ${parseFloat(((index + 1) / totalStories) * 100).toFixed(2)}% (${index}/${totalStories})`
		);
	}
});

debugger;
var token = fs.readFileSync('appToken.config', 'utf8');
if (token === undefined || token === '') throw 'BAD TOKEN';

var ClientStatuses = {
	0: 'READY',
	1: 'CONNECTING',
	2: 'RECONNECTING',
	3: 'IDLE',
	4: 'NEARLY',
	5: 'DISCONNECTED',
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	memory.load();
});

client.on('message', msg => {
	if (msg.author.username === 'Ginny') return; //Temporary
	if (msg.content === 'status') {
		msg.reply(
			`Status: ${client.status} (${ClientStatuses[client.status]})\nUptime: ${extrapolateTimeString(
				client.uptime
			)}`
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
});

client.on('error', error => {
	console.log(new Date().toString() + ' Error occured:');
	console.log(`Status: ${client.status} (${ClientStatuses[client.status]})`);
	console.log(`Uptime: ${extrapolateTimeString(client.uptime)}`);
	if (error.name) console.log(`Name: ${error.name}`);
	if (error.messsage) console.log(`Message: ${error.message}`);
	if (error.stack) console.log(`Stack: ${error.stack}`);

	if (client.status === 5) client.login(token);
});

client.login(token);

setInterval(function() {
	memory.save();
}, 3 * 60 * 1000); //3 minutes

function extrapolateTimeString(ms) {
	let baseDate = new Date(0);
	let uptime = new Date(ms);

	let diff = uptime.getTime() - baseDate.getTime();
	let days = Math.floor(diff / (1000 * 60 * 60 * 24));
	diff -= days * (1000 * 60 * 60 * 24);
	let hours = Math.floor(diff / (1000 * 60 * 60));
	diff -= hours * (1000 * 60 * 60);
	let mins = Math.floor(diff / (1000 * 60));
	diff -= mins * (1000 * 60);
	let seconds = Math.floor(diff / 1000);
	diff -= seconds * 1000;
	return `${days}:${hours}:${mins}:${seconds}`;
}
