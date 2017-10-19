module.exports = {
	env: "production",

	endpoints: {
		api: "http://138.68.105.49/"
	},

	server: {
		port: process.env.NODEJS_PORT || 8080,
		ip: process.env.NODEJS_IP || "127.0.0.1",
		db: {
			uri: process.env.MONGODB_DB_URL || "mongodb://127.0.0.1/lighthouse"
		}
	},

	gitHubToken: process.env.GITHUB_TOKEN,

	cachedDomains: ["react", "vuejs", "c++", "node.js", "javascript", "graphql", "mongodb", "git"]
}
