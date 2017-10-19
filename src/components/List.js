import React from "react"

import "./style.scss"

const renderRepo = repo => (
	<a href={repo.html_url} target="_blank" rel="noopener noreferrer" styleName="repo" key={repo.html_url}>
		<div styleName="name">{repo.name}</div>
		<div styleName="score">score {Math.round(repo.lightHouseScore)}</div>
	</a>
)

module.exports = props => (
	<div styleName="list">
		<div styleName="content">
			{props.repos.sort((a, b) => b.lightHouseScore - a.lightHouseScore).map(renderRepo)}
		</div>
	</div>
)
