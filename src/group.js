class Group {
	constructor(arr) {
		this.id = arr.join(',');
		this.words = arr;
	}
}

module.exports = Group;
