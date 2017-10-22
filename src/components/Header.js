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
			<div styleName="subtitle">
				Want to help devs in distress? peek through the lighthouse and contribute to great projects at
				sea!
			</div>
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
