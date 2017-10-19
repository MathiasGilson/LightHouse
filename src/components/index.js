import React from "react"

import request from "../utils/request"
import Header from "./Header"
import List from "./List"
import "./style.scss"

module.exports = class App extends React.Component {
	state = {
		loading: false,
		value: "",
		repos: []
	}

	onSearch = value => {
		this.setState({
			loading: true
		})
		request
			.get(`search?q=${value}`)
			.then(res => {
				this.setState({
					loading: false
				})
				console.log(res)
				if (res.ok && res.data) {
					this.setState({
						repos: res.data
					})
				}
			})
			.catch(console.error)
	}

	handleKeyPress = e => e.key === "Enter" && this.onSearch(this.state.value)

	onChange = e => this.setState({ value: e.target.value })

	renderContent = () => {
		if (this.state.loading) {
			return <div styleName="loader">Scanning the ocean of code...</div>
		}
		return <List repos={this.state.repos} />
	}

	render() {
		return (
			<div styleName="container">
				<Header
					loading={this.state.loading}
					onChange={this.onChange}
					handleKeyPress={this.handleKeyPress}
				/>
				<div styleName="wrapper">{this.renderContent()}</div>
			</div>
		)
	}
}
