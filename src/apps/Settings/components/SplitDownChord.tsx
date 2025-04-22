import * as React from "react"

const SvgComponent = (props: {
	color: string
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 200 200"
		width="100%"
		height="100%"
	>
		<path
			d="M177.2 141.7c8.5 0 15.4 6.9 15.4 15.4v15.5c0 8.5-6.9 15.4-15.4 15.4h-43.3c-8.5 0-15.4-6.9-15.4-15.4v-15.5c0-8.5 6.9-15.4 15.4-15.4h43.3zM78.3 76.8h43.3c8.5 0 15.4 6.9 15.4 15.4v15.5c0 8.5-6.9 15.4-15.4 15.4H78.4c-8.5 0-15.4-6.9-15.4-15.4V92.2c-.1-8.5 6.8-15.4 15.3-15.4zM66.1 12c8.5 0 15.4 6.9 15.4 15.4v15.5c0 8.5-6.9 15.4-15.4 15.4H22.8c-8.5 0-15.4-6.9-15.4-15.4V27.4c0-8.5 6.9-15.4 15.4-15.4h43.3z"
			style={{
				fill: props.color,
			}}
		/>
	</svg>
)
export default SvgComponent
