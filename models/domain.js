const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: String,
	repos: [
		{
			name: String,
			html_url: String,
			lightHouseScore: Number
		}
	]
})

module.exports = mongoose.model("Domain", schema)
