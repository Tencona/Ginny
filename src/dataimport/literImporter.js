var delimeter = 'ৄ';

module.exports = {
	test: function() {
		console.log('literImporter.js test');
	},
	datasetDirPath: 'C:\\Datasets\\liter',
	baseDirectory: {},
	categories: [],
	stories: [],
	metadatas: {},

	getCategories() {
		console.log(`Getting categories`);
		var dir = this.baseDirectory.directories.find(
			dir => dir.name === 'categories'
		);
		dir.deepCrawl();
		var s = '';

		let categories = [];
		dir.files.forEach((file, index) => {
			if (file.name.substr(0, 1) === '.') return;

			let category = new Category(this, file.name);
			let content = file.read();
			let lines = content.split('\n');
			lines.forEach(line => {
				if (line === '') return;
				let metadata = new StoryMetadata(this, line.split(delimeter));
				if (metadata.path) {
					this.metadatas[metadata.path] = metadata;
				}
			});

			if (index % 10 === 0 || index + 1 === dir.files.length)
				console.log(
					`Processed ${parseFloat(
						((index + 1) / dir.files.length) * 100
					).toFixed(2)}% (${index}/${dir.files.length})`
				);
			categories.push(category);
		});

		this.categories = categories;
		console.log(`Finished getting categories`);
	},

	getStories() {
		console.log('Getting stories');
		var dir = this.baseDirectory.directories.find(
			dir => dir.name === 'story_text'
		);

		let start = new Date().getTime();
		dir.deepCrawl();
		let end = new Date().getTime();
		console.log(`deepCrawl: ${end - start}ms`);

		console.log(`Located ${dir.files.length} stories`);
		let stories = [];
		console.log(`Matching story metadata`);
		dir.files.forEach((file, index) => {
			stories.push(new Story(this, file, this.metadatas[file.path]));
			if (index % 500 === 0 || index + 1 === dir.files.length)
				console.log(
					`Matched ${parseFloat(
						((index + 1) / dir.files.length) * 100
					).toFixed(2)}% (${index}/${dir.files.length})`
				);
		});

		this.stories = stories;
		console.log(`Finished getting stories`);
	},
};

class Category {
	constructor(base, name) {
		this.base = base;
		this.name = name;
	}

	getStoryMetadatas() {
		return this.base.storyMetadata.filter(x => x.category === this.name);
	}
}

class StoryMetadata {
	constructor(base, arr) {
		this.url = arr[0];
		this.rating = arr[1];
		this.category = arr[2];
		this.publishDate = arr[3];
		this.title = arr[4];
		this.author = arr[5]; //?
		this.numbers = arr[6]; //What is this?
		this.subtitle = arr[7];
		this.numbers2 = arr[8]; //?
		this.numbers3 = arr[9]; //?
		this.tags = arr[10];
		this.path = base.datasetDirPath + '\\' + arr[11].replace('/', '\\');
		this.fileName = arr[11].split('/')[1];
		this.none = arr[12]; //?
	}
}

class Story {
	constructor(base, file, metadata) {
		this.base = base;
		this.file = file;
		this.metadata = metadata;
	}

	read() {
		return this.file.read();
	}
}
