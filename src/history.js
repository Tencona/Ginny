const memory = require('./memory');
const chain = require('./chain.js');

module.exports = {
	channel: {},
	lastSnowflake: undefined,
	init: function(client) {
		let guild = Array.from(client.guilds).find(x => x[1].name === 'D&D')[1];
		this.channel = Array.from(guild.channels).find(x => x[1].name === 'general')[1]; //I hate this
	},
	fetchAndProcessMessages: function() {
		let options = {
			limit: 100,
			before: this.lastSnowflake,
		};

		this.channel
			.fetchMessages(options)
			.then(messages => {
				let arr = Array.from(messages);
				this.lastSnowflake = arr[arr.length - 1][0];
				arr = arr.map(x => x[1].content);
                arr.forEach(msg => chain.process(msg));
                
                //We found 100 messages, so there's likely more after that
                if (arr.length === 100) this.fetchAndProcessMessages();
                else {
                    console.log('Finished processing history');
                    memory.save();
                    console.log('Finished saving tree');
                }
			})
			.catch(console.error);
	},
};
