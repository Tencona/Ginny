const memory = require('./memory');
const Group = require('./group.js');

module.exports = {
	process: function(source) {
		// this.source = source;
		this.parts = source.split(' ');
		if (this.parts < 2) return false;

		// memory.data.tree.processWords(this.parts);
		this.groupParts();
	},

	/* groupParts will make every 2, 3, and 4 groupings of every word passed to it.
		If the group is found, the count is incremented, otherwise it's added to the array
		
		Example:
			Input: The quick brown fox jumped over the lazy dog.

			Groups:
				The, quick
				The, quick, brown,
				The, quick, brown, fox
				quick, brown
				quick, brown, fox
				quick, brown, fox, jumped
				brown, fox
				brown, fox, jumped
				brown, fox, jumped, over

				[...]
	*/
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
		if (memory.data.groups.length > 0) foundGroup = memory.data.groups[group.id];
		if (foundGroup) {
			foundGroup.count += 1;
		} else {
			group.count = 1;
			memory.data.groups[group.id] = group;
		}

		//Tree
		// memory.data.tree.processWords(group.words);
	},
};
