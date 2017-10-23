const GitHubApi = require("github")
const Promise = require("bluebird")
const moment = require("moment")
const config = require("config")

const github = new GitHubApi()

github.authenticate({
	type: "token",
	token: config.get("gitHubToken")
})

const OVER_NINE_THOUSAND = 9001

const search = (q, sort = "stars") =>
	github.search
		.repos({ q, sort, per_page: 60 })
		.then(res => {
			return res.data.items
		})
		.then(repos =>
			Promise.map(repos, repo =>
				github.repos
					.getStatsPunchCard({
						owner: repo.owner.login,
						repo: repo.name
					})
					.then(res => Object.assign({}, repo, { commit_frequency: getCommitFrequency(res) }))
					.catch(console.error)
			)
		)
		.then(repos =>
			Promise.map(repos, repo =>
				github.issues
					.getForRepo({
						owner: repo.owner.login,
						repo: repo.name,
						per_page: 50,
						sort: "updated",
						direction: "asc"
					})
					.then(res =>
						Object.assign({}, repo, {
							open_issues_score: res.data.reduce(
								(acc, issue) => acc + moment().diff(moment(issue.updated_at), "days"),
								0
							)
						})
					)
					.catch(console.error)
			)
		)
		.then(repos => repos.map(repo => Object.assign(repo, { lightHouseScore: getLightHouseScore(repo) })))
		.catch(console.error)

const getCommitFrequency = res => res.data.reduce((acc, day) => acc + day[2], 0) / res.data.length

const getLightHouseScore = repo =>
	repo.open_issues_score /
	(repo.commit_frequency * OVER_NINE_THOUSAND) *
	Math.max(repo.watchers_count, repo.forks_count)

module.exports = { search }
