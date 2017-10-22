import React from "react"

import "./style.scss"

const renderDomain = (domain, props) => (
	<div styleName="repo" key={domain.name} onClick={() => props.onSelect(domain.name)}>
		<div styleName="name">{domain.name}</div>
		<div styleName="score">{domain.repos.length} repos</div>
	</div>
)

module.exports = props => (
	<div styleName="list">
		<div styleName="content">{props.domains.map(d => renderDomain(d, props))}</div>
	</div>
)
