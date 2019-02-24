const fs = require('fs');
const Tree = require('./tree.js');

module.exports = {
	data: {
		groups: [],
		tree: new Tree(),
	},
	save: function() {
		fs.writeFileSync('./data.json', JSON.stringify(this.data));
	},
	load: function() {
		this.data = JSON.parse(fs.readFileSync('./data.json'));
	},
};
