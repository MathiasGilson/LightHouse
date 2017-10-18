const utils = require("./utils")
const Domain = require("../models/domain")

const search = (req, res) => {
	if (req.body.id) {
		Domain.findById(req.body.id)
			.then(domain => res.status(200).json({ ok: true, data: domain.repos }))
			.catch(err => {
				console.error(err)
				res.status(401).json({ ok: false, err })
			})
	} else {
		utils.search(req.body.query, req.body.sort).then(data => res.status(200).json({ ok: true, data }))
	}
}

module.exports = { search }
