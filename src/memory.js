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
		if (fs.existsSync('./data.json')) {
			let content = fs.readFileSync('./data.json');
			if (content === '') {
				this.data = {};
			} else {
				this.data = JSON.parse(content);
			}
		} else {
			fs.writeFileSync('./data.json', '{}');
			this.data = {};
		}
		if (!this.data.groups) this.data.groups = [];
		if (!this.data.tree) this.data.tree = new Tree();
	},
};
