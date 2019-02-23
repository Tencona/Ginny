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
		//go through this.parts and take every group of 2 and 3 and find those in the database and update their count
		var group = [];
		for (var i = 0; i < this.parts.length - 1; i++) {
			group.push(this.parts[i]);
			if (this.parts[i + 1] !== undefined) {
				group.push(this.parts[i + 1]);
				this.saveGroup(new Group(group));
			}
			if (this.parts[i + 2] !== undefined) {
				group.push(this.parts[i + 2]);
				this.saveGroup(new Group(group));
			}
			if (this.parts[i + 3] !== undefined) {
				group.push(this.parts[i + 3]);
				this.saveGroup(new Group(group));
			}
			if (this.parts[i + 4] !== undefined) {
				group.push(this.parts[i + 4]);
				this.saveGroup(new Group(group));
			}
			if (this.parts[i + 5] !== undefined) {
				group.push(this.parts[i + 5]);
				this.saveGroup(new Group(group));
			}
			if (this.parts[i + 6] !== undefined) {
				group.push(this.parts[i + 6]);
				this.saveGroup(new Group(group));
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
	},
};
