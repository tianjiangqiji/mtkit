/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";

const UpdateCard = (props: {
	v: string
	data: string[]
}) => {
	return <>
		<div css={UpdateCard_css}>
			<div className="v">{props.v}</div>
			{props.data.map((x, y) => <div className="content"  key={y}>
				{props.data.length !== 1 && <span className="i">{y + 1}.</span>}
				<span className="each">{x}</span>
			</div>)}
		</div>
	</>
}

export default UpdateCard

const UpdateCard_css = css({
	width: "100%",
	maxWidth: 550,
	backgroundColor: "white",
	justifyContent: "start",
	...cssFunctions.px(20),
	...cssFunctions.py(15),
	paddingTop:20,
	borderRadius: 10,
	boxShadow: "0 0 10px rgba(0,0,0,0.01)",
	"& .v": {
		...cssFunctions.px(15),
		...cssFunctions.py(5),
		borderRadius: 999,
		backgroundColor: googleColors.blue50,
		width: "fit-content",
		fontSize: 12,
		color: googleColors.blue800,
		...cssPresets.flexCenter,
		justifyContent: "start",
		marginBottom: 15,
	},
	"& .content": {
		display: "flex",
		flexWrap:"nowrap",
		marginBottom:8,
		"&>.i": {
			display: "block",
			color: googleColors.blue800,
			marginRight:2,
			minWidth:20,
			texAlign: "left",
		},
		"&>.each": {
			display: "block",
			textAlign:"left",
			color: googleColors.gray800,
			...cssPresets.flex
		}
	}
})
