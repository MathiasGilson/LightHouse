const config = require("config")

// express settings
const bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	morgan = require("morgan")

const app = require("express")()

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Credentials", true)
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
		res.header(
			"Access-Control-Allow-Headers",
			"X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Token"
		)
		next()
	})
	.use(morgan("combined"))
	.use(methodOverride())

// routes
app.use("/api", require("./api"))

const server = require("http").Server(app)

server.listen(config.get("server.port"), config.get("server.ip"), () => {
	console.log("Listening at " + config.get("server.ip") + " on port " + config.get("server.port"))
})

// useful for testing server
module.exports = app
