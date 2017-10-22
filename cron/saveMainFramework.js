const utils = require("../api/utils")
const config = require("config")
const Promise = require("bluebird")
const GitHubApi = require("github")

const github = new GitHubApi()

github.authenticate({
	type: "token",
	token: config.get("gitHubToken")
})

Promise.all(
	config.get("cachedDomains").map(domain =>
		utils.search(domain).then(res => {
			return { name: domain, repos: res }
		})
	)
)
	.then(res => {
		return Buffer.from("(function(){ window.data = " + JSON.stringify(res) + " })();").toString("base64")
	})
	.then(res => {
		github.repos
			.getContent({
				owner: "MathiasGilson",
				repo: "LightHouse",
				path: "public/js/cached.js"
			})
			.then(content => {
				github.repos
					.updateFile({
						owner: "MathiasGilson",
						repo: "LightHouse",
						path: "public/js/cached.js",
						message: "cache update",
						content: res,
						sha: content.data.sha
					})
					.catch(res => {
						console.log(res)
					})
			})
	})
