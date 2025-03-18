/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useIntervalConfig from "@/assets/stores/useIntervalConfig.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {IoArrowDown, IoArrowUp} from "react-icons/io5";
import {isMobile} from "react-device-detect";
import DoubleAlterSwitch from "@/apps/Interval/comps/DoubleAlterSwitch.tsx";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";

const selectorHeight = 55
const PhoneIntervalBtmPicker = () => {
	const switchOnColor = googleColors.blue800
	const {notePickerStep, notePickerAlter, setNotePickerOpen} = useGlobalSettings()
	const intervalPickConfig = useIntervalConfig();
	return <div css={phone_note_picker_css} style={{userSelect:"none"}}>
		<div className="functional_area">
			<div className="direction"
			     onClick={() => intervalPickConfig.setIsUpward(!intervalPickConfig.isUpward)}>
				{intervalPickConfig.isUpward ? <IoArrowUp size={25} style={{marginLeft: 5}} color={googleColors.blue800}/> :
					<IoArrowDown style={{marginLeft: 5}} size={25} color={switchOnColor}/>}
			</div>
			<div className="double_alter_show"
			     onClick={() => intervalPickConfig.setIsDoubleAlterShown(!intervalPickConfig.isDoubleAlterShown)}>
				<div onClick={() => intervalPickConfig.setIsDoubleAlterShown(!intervalPickConfig.isDoubleAlterShown)}>
					<DoubleAlterSwitch color={intervalPickConfig.isDoubleAlterShown ? switchOnColor : googleColors.gray500}/>
				</div>
			</div>
			<div className="switch_reverse" onClick={() => intervalPickConfig.setIsReverse(!intervalPickConfig.isReverse)}>
				<HiOutlineSwitchHorizontal style={{marginRight: 5}} size={23} color={switchOnColor}/>
			</div>
		</div>
		<div className="picker_note_window" onClick={() => setNotePickerOpen(true)}>
			<NoteText step={notePickerStep} alter={notePickerAlter} fontSize={35}/>
		</div>
	</div>
}

export default PhoneIntervalBtmPicker
const phone_note_picker_css = css({
	userSelect: "none",
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
		width: "calc(100% - 85px - 25px)",
		maxHeight: 220,
		marginRight: 20,
		maxWidth: 220,
		backgroundColor: "white",
		borderRadius: 999,
		...cssPresets.flexCenter,
		fontFamily: "misans-m",
		border: `1px solid ${googleColors.gray300}`,
		overflow: "hidden",

		"& .direction": {
			width: "calc(100% / 3)",
			height: "100%",
			...cssPresets.flexCenter,
			transition: "all ease 0.1s",
			cursor: "pointer",

			"&:hover": isMobile ? "" : {
				backgroundColor: googleColors.gray200,
			},
			"&:active": {
				backgroundColor: googleColors.gray300,
			},
		},
		"& .double_alter_show": {
			borderLeft: `1px solid ${googleColors.gray200}`,
			width: "calc(100% / 3)",
			// minWidth: 65,
			height: "100%",
			...cssPresets.flexCenter,
			transition: "all ease 0.1s",
			cursor: "pointer",
			"&:hover": isMobile ? "" : {
				backgroundColor: googleColors.gray200,
			}, "&:active": {
				backgroundColor: googleColors.gray300,
			},
			"&>div": {
				width: "fit-content",
				height: 20,
			}
		},
		"& .switch_reverse": {
			boxSizing: "border-box",
			borderLeft: `1px solid ${googleColors.gray200}`,
			height: "100%",
			width: "calc(100% / 3)",
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
		width: 85,
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
