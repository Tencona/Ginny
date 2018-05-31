const fs = require('fs');

module.exports = {
	data: {
		groups: [],
	},
	save: function() {
		fs.writeFileSync('./data.json', JSON.stringify(this.data));
	},
	load: function() {
		this.data = JSON.parse(fs.readFileSync('./data.json'));
	},
};
