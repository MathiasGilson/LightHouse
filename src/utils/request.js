import "whatwg-fetch"

const baseUrl = "https://immense-lowlands-78811.herokuapp.com/api/"

const get = (url, headers) =>
	fetch(baseUrl + url, {
		method: "GET",
		headers: {
			...headers
		}
	})
		.then(response => response.text())
		.then(responseText => JSON.parse(responseText))
		.catch(error => console.log(error))

const post = (url, body) =>
	fetch(baseUrl + url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})
		.then(response => response.text())
		.then(responseText => JSON.parse(responseText))
		.catch(error => console.log(error))

module.exports = { get, post }
