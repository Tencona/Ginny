const memory = require('./memory');
const Group = require('./group.js');

module.exports = {
	process: function(source) {
		this.source = source;
		this.parts = source.split(' ');
		if (this.parts < 2) return false;
		this.groupParts();
	},
	groupParts: function() {
		var group = [];
		for (var i = 0; i < this.parts.length - 1; i++) {
			//Length of chain
			for (let p = 0; p < 4; p++) {
				if (this.parts[i + p] !== undefined) {
					group.push(this.parts[i + p]);
					if (group.length > 1) {
						this.saveGroup(new Group(group));
					}
				}
			}
			group = [];
		}
	},
	saveGroup: function(group) {
		var foundGroup;
		if (memory.data.groups.length > 0)
			foundGroup = memory.data.groups.find(g => g.id === group.id);
		if (foundGroup) {
			foundGroup.count += 1;
		} else {
			group.count = 1;
			memory.data.groups.push(group);
		}

		//Tree
		memory.data.tree.processWords(group.words);
	},
};
