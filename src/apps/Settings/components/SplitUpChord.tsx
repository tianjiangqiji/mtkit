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
			d="M66.1 141.7c8.5 0 15.4 6.9 15.4 15.4v15.5c0 8.5-6.9 15.4-15.4 15.4H22.8c-8.5 0-15.4-6.9-15.4-15.4v-15.5c0-8.5 6.9-15.4 15.4-15.4h43.3zm55.5-64.9c8.5 0 15.4 6.9 15.4 15.4v15.5c0 8.5-6.9 15.4-15.4 15.4H78.4c-8.5 0-15.4-6.9-15.4-15.4V92.2c0-8.5 6.9-15.4 15.4-15.4h43.2zM177.2 12c8.5 0 15.4 6.9 15.4 15.4v15.5c0 8.5-6.9 15.4-15.4 15.4h-43.3c-8.5 0-15.4-6.9-15.4-15.4V27.4c0-8.5 6.9-15.4 15.4-15.4h43.3z"
			style={{
				fill: props.color,
			}}
		/>
	</svg>
)
export default SvgComponent
