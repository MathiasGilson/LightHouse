const router = require("express").Router()
const service = require("./service")

router.route("/")
	.post(service.search)

module.exports = router