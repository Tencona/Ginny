const Node = require('./node.js');

class Tree {
	constructor(nodes) {
		this.nodes = nodes || [];
	}

	/* Takes any number of words in an array then builds a tree out of them, keeping count for how often a path is made
	The way it works is by taking the first word and seeing if it fits on the root layer of nodes
	If the word is not found, make a new node then go into the loop, otherwise if it finds the node, it will just increment before looping
	Looping takes the next word and checks to see if it exists as a child of the previous node, increments, then goes down a layer
	This essentially builds a linked-list path of every array of words passed into this method.
	Example:
		Input: The quick brown fox jumped over the lazy dog.
		Input: The quick brown fox landed on all four feet.
		
		Tree:
		The 2
		quick 2
		brown 2
		fox 2
		jumped 1	|	landed 1
		over 1		|	on 1
		the 1		|	all 1
		lazy 1		|	four 1
		dog 1		|	feet 1

	*/
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
			let nextNode = currentNode.children.find(node => node.word === currentWord);
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
