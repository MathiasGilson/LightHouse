import React from "react"

import "./style.scss"

module.exports = props => (
	<div styleName="header">
		<div style={{ backgroundImage: 'url("./public/img/off.svg")' }} styleName="logo" />
		<div
			style={{ backgroundImage: 'url("./public/img/on.svg")' }}
			styleName={`logo ${props.loading ? "loading" : ""}`}
		/>
		<div styleName="content">
			<div styleName="title">GitHub LightHouse</div>
			<input
				type="text"
				value={props.value}
				onChange={props.onChange}
				onKeyPress={props.handleKeyPress}
				placeholder="In what language/framework you want to contribute ?"
			/>
			{props.displayCancel ? (
				<div styleName="dismiss" onClick={props.onCancel}>
					Retour
				</div>
			) : null}
		</div>
	</div>
)
