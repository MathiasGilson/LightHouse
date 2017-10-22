import React from "react"

import request from "../utils/request"
import Header from "./Header"
import List from "./List"
import DomainList from "./DomainList"
import "./style.scss"

module.exports = class App extends React.Component {
	state = {
		loading: false,
		value: "",
		repos: [],
		domains: []
	}

	componentDidMount = () => {
		if (window.data) {
			this.setState({
				domains: window.data
			})
		}
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

	onCancel = () => this.setState({ repos: [], value: "" })

	onSelect = domain => this.setState({ value: domain, repos: this.state.domains.find(d => d.name === domain).repos })

	renderContent = () => {
		const { loading, repos, domains } = this.state
		if (loading) {
			return <div styleName="loader">Scanning for devs in distress...</div>
		} else if (repos.length > 0) {
			return <List repos={repos} />
		}
		return <DomainList onSelect={this.onSelect} domains={domains} />
	}

	render() {
		return (
			<div styleName="container">
				<Header
					loading={this.state.loading}
					onChange={this.onChange}
					value={this.state.value}
					handleKeyPress={this.handleKeyPress}
					displayCancel={this.state.repos.length > 0}
					onCancel={this.onCancel}
				/>
				<div styleName="wrapper">{this.renderContent()}</div>
			</div>
		)
	}
}
