/* eslint-disable no-mixed-spaces-and-tabs */

import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIntervalConfig from "@/assets/stores/useIntervalConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {css} from "@emotion/react";
import {isMobile} from "react-device-detect";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import {useWindowSize} from "react-use";

const selectorHeight = 55
const TabletIntervalBtmPicker = () => {
	const switchOnColor = googleColors.blue800
	const {height} = useWindowSize();
	const {notePickerStep, notePickerAlter, setNotePickerOpen, intervalFunctionsFullHeight} = useGlobalSettings()
	const intervalPickConfig = useIntervalConfig();
	return <div css={tablet_note_picker_css}>
		{height <= intervalFunctionsFullHeight && <div className="functional_area">
			<div className="switch_reverse" onClick={() => intervalPickConfig.setIsReverse(!intervalPickConfig.isReverse)}>
				<HiOutlineSwitchHorizontal style={{marginRight: 5}} size={23} color={switchOnColor}/>
			</div>
		</div>}
		<div className="picker_note_window" onClick={() => setNotePickerOpen(true)}>
			<NoteText step={notePickerStep} alter={notePickerAlter} fontSize={35}/>
		</div>
	</div>
}

export default TabletIntervalBtmPicker
const tablet_note_picker_css = css({
	width: "100%",
	maxWidth: 400,
	paddingLeft: 15,
	paddingRight: 15,
	marginLeft: "auto",
	marginRight: "auto",
	display: "flex",
	justifyContent: "center",
	"& .functional_area": {
		height: selectorHeight,
		width: 100,
		maxHeight: 220,
		marginRight: 20,
		maxWidth: 220,
		backgroundColor: "white",
		borderRadius: 999,
		...cssPresets.flexCenter,
		fontFamily: "misans-m",
		border: `1px solid ${googleColors.gray300}`,
		overflow: "hidden",

		"& .switch_reverse": {
			boxSizing: "border-box",
			height: "100%",
			width: "100%",
			...cssPresets.flexCenter,
			color: googleColors.gray800,
			transition: "all ease 0.1s",
			cursor: "pointer",
			"&:hover": isMobile ? "" : {
				backgroundColor: googleColors.gray200,
			}, "&:active": {
				backgroundColor: googleColors.gray300,
			},

		},
	},

	"& .picker_note_window": {
		userSelect: "none",
		width: 100,
		height: selectorHeight,
		backgroundColor: "white",
		border: `1px solid ${googleColors.gray300}`,
		borderRadius: 999,
		...cssPresets.flexCenter,
		cursor: "pointer",
		transition: "all ease-in-out 0.1s",
		"&:hover": {
			backgroundColor: googleColors.gray200,
		}, "&:active": {
			backgroundColor: googleColors.gray300,
		},
	}
})
