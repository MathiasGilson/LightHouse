const router = require("express").Router()
const service = require("./service")

router.route("/search").get(service.search)

module.exports = router
