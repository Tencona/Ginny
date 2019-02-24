const Node = require('./node.js');

class Tree {
	constructor() {
		this.nodes = [];
	}

	processWords(words) {
		let currentWord = words[0];
		let currentNode = this.nodes.find(node => node.word === currentWord);
		if (!currentNode) {
			currentNode = new Node(currentWord, undefined, undefined);
		}

		for (let i = 1; i < words.length; i++) {
			currentWord = words[i];
			let nextNode = currentNode.children.find(
				node => node.word === currentWord
			);
			if (!nextNode) {
				nextNode = new Node(currentWord, currentNode, undefined);
			}
			currentNode.children.push(nextNode);
			currentNode = nextNode;
		}
	}
}

module.exports = Tree;
