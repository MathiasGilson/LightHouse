const utils = require("../api/utils")
const Domain = require("../models/domain")
const config = require("config")

config.get("cachedDomains").forEach(domain => {
	utils.search(domain).then(repos => {
		Domain.findOne({ name: domain }).then(domain => {
			if(domain) {
				domain.repos = repos
				domain.save()
			} else {
				const newDomain = new Domain({
					name: domain,
					repos
				})

				newDomain.save()
			}
		})
	})
})
