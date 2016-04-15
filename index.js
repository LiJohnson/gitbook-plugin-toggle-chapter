module.exports = {
	book: {
		assets: "./book",
		js: ["plugin.js"],
		css:["plugin.css"]
	},
	hooks: {
		page: function(page) {
			//do nothing , just for fun
			return page;
		}
	}
};