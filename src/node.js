class Node {
	constructor(word, parent, children) {
		this.word = word;
		this.parent = parent;
		if (!children) children = [];
		this.children = children;

		this.count = 1;
	}
}

module.exports = Node;
