class Group {
	constructor(arr) {
		this.words = arr;
		this.id = arr.join(',');
	}
}

module.exports = Group;
