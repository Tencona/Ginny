const Node = require('./node.js');

class Tree {
	constructor() {
		this.nodes = [];
	}

	//This needs to be passed much larger arrays. Full sentences or entire messages?
	processWords(words) {
		let currentWord = words[0];
		let currentNode = this.nodes.find(node => node.word === currentWord);
		if (!currentNode) {
			currentNode = new Node(currentWord, undefined, undefined);
			this.nodes.push(currentNode);
		} else {
			currentNode.count += 1;
		}

		for (let i = 1; i < words.length; i++) {
			currentWord = words[i];
			let nextNode = currentNode.children.find(
				node => node.word === currentWord
			);
			if (!nextNode) {
				nextNode = new Node(currentWord, currentNode, undefined);
				currentNode.children.push(nextNode);
			} else {
				nextNode.count += 1;
			}
			currentNode = nextNode;
		}
	}
}

module.exports = Tree;
