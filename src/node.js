class Node {
	constructor(word, parent, children) {
		this.word = word;
		//JSON can't handle the parent because it's a circular reference. Use ID's instead.
		// this.parent = parent;
		if (!children) children = [];
		this.children = children;

		this.count = 1;
	}
}

module.exports = Node;
