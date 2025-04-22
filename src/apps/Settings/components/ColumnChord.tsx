import * as React from "react"

const SvgComponent = (props: {
	color: string
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		id="\u56FE\u5C42_1"
		x={0}
		y={0}
		viewBox="0 0 200 200"
		width="100%"
		height="100%"
	>
		<path
			d="M161.4 148.7c8.5 0 15.4 6.9 15.4 15.4v8.3c0 8.5-6.9 15.4-15.4 15.4H38.6c-8.5 0-15.4-6.9-15.4-15.4v-8.3c0-8.5 6.9-15.4 15.4-15.4h122.8zm0-136.4c8.5 0 15.4 6.9 15.4 15.4V36c0 8.5-6.9 15.4-15.4 15.4H38.6c-8.5 0-15.4-6.9-15.4-15.4v-8.3c0-8.5 6.9-15.4 15.4-15.4h122.8zM157.8 80c10.5 0 19 6.9 19 15.4v8.3c0 8.5-8.5 15.4-19 15.4H42.2c-10.5 0-19-6.9-19-15.4v-8.3c0-8.5 8.5-15.4 19-15.4h115.6z"
			style={{
				fill: props.color,
			}}
		/>
	</svg>
)
export default SvgComponent
