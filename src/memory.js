const performance = require('perf_hooks').performance;
const fs = require('fs');
const Tree = require('./tree.js');

module.exports = {
	data: {
		groups: {},
		tree: new Tree(),
	},
	save: function() {
		let startTime = performance.now();
		fs.writeFileSync('./data.json', JSON.stringify(this.data));
		let endTime = performance.now();

		console.log(`Saving Finished: ${(endTime - startTime).toFixed(2)}ms`);
		console.log(`Saved ${Object.keys(this.data.groups).length} word groups`);
		console.log(`Saved ${this.data.tree.nodes.length} tree roots`);
	},
	load: function() {
		let startTime = performance.now();

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
		if (!this.data.groups) this.data.groups = {};
		if (!this.data.tree) this.data.tree = new Tree();
		else this.data.tree = new Tree(this.data.tree.nodes);

		let endTime = performance.now();

		console.log(`Loading Finished: ${(endTime - startTime).toFixed(2)}ms`);
		console.log(`Loaded with ${Object.keys(this.data.groups).length} word groups`);
		console.log(`Loaded with ${this.data.tree.nodes.length} tree roots`);
	},
};
