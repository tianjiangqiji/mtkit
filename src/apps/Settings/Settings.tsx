/* eslint-disable no-mixed-spaces-and-tabs */
import ResetApp from "@/apps/Settings/components/ResetApp.tsx";
import MidiSelection from "@/apps/Settings/parts/MidiSelection.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import UseResetAllStores from "@/assets/stores/useResetAllStores.tsx";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Settings = (props: {}) => {
	const {naviBarHeight} = useGlobalSettings()
	return <>
		<Toaster/>
		<div css={Settings_css(naviBarHeight)}>
			<div className="inner_frame">
				<MidiSelection/>
				<ResetApp/>
			</div>

		</div>
	</>
}

export default Settings

const Settings_css = (h: number) => css({
	width: "100%",
	height: `calc(100% - ${h}px)`,
	overflowY: "auto",
	"& .inner_frame": {
		...cssPresets.mxAuto,
		width: "100%",
		maxWidth: 550,
		...cssFunctions.px(15)
	},
	"& .reset": {
		width: "100%",
		backgroundColor: "white",
		borderRadius:8,
		height: 150,
		userSelect: "none",
		...cssPresets.flexCenter,
		flexDirection: "column",
		marginTop: 15,
		"& .reset_desc": {
			fontSize: 14,
			color: googleColors.gray400,
			userSelect: "none",
			marginLeft: 40,
			marginRight: 40,
		},
		"& .btn": {
			width: 125,
			height: 45,
			userSelect: "none",
			...cssPresets.flexCenter,
			backgroundColor: googleColors.red300,
			borderRadius: 999,
			fontSize: 16,
			marginTop: 15,
			cursor: "pointer",
			...cssPresets.transition,
			color: googleColors.red50,
			"&:hover": {
				backgroundColor: googleColors.red400,
			},
			"&:active": {
				backgroundColor: googleColors.red800,
			},
		}
	},
})
