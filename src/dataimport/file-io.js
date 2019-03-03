var fs = require('fs');

module.exports = {
	knownPaths: [],
	operatingPath: '',
	test: function() {
		console.log('file-io.js test');
	},

	readDir: function(path) {
		this.operatingPath = path;
		var dir = new Directory(path);
		dir.deepCrawl();
		return dir;
	},
};

//Rename this?
class Path {
	constructor(path) {
		this.path = path;
		this.name = this.name = path.substr(path.lastIndexOf('\\') + 1);
	}
}

class Directory extends Path {
	constructor(path) {
		super(path);
	}
	deepCrawl() {
		this.directories = [];
		this.files = [];

		var dir = fs.readdirSync(this.path, { withFileTypes: true });
		for (var i = 0; i < dir.length; i++) {
			var currentPath = this.path + '\\' + dir[i].name;
			if (dir[i].isDirectory())
				this.directories.push(new Directory(currentPath));
			if (dir[i].isFile()) this.files.push(new File(currentPath));
		}
	}
}

class File extends Path {
	constructor(path) {
		super(path);
		this.extension = path.substr(path.lastIndexOf('.') + 1);
	}

	read() {
		return fs.readFileSync(this.path, 'utf8');
	}
}
