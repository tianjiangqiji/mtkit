/* eslint-disable no-mixed-spaces-and-tabs */
import useScoreChecker from "@/apps/MobileScoreChecker/useScoreChecker/useScoreChecker.tsx";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useInstrument from "@/assets/instruments/useInstrument.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import UseScoreCheckerConfig from "@/assets/stores/useScoreCheckerConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import {isMobile} from "react-device-detect";
import {AiOutlineSound} from "react-icons/ai";
import {GrConfigure, GrPowerCycle} from "react-icons/gr";
import * as music12 from "@/music12";
import * as Tone from "tone";

const iconSize = 25
const iconColor = GoogleColors.blue800
const ConfigWindow = () => {
	const {
		setNotePickerStep,
		setNotePickerAlter,
		setOctave,
		octave,
		notePickerStep,
		notePickerAlter
	} = useGlobalSettings()
	const {semitoneMove} = useScoreChecker()
	const {setIsOneNoteCheckerWindowOpen, setOneNoteStaveClef} = UseScoreCheckerConfig()
	const {player} = useInstrument()
	const resetConfig = () => {
		setNotePickerStep("C")
		setNotePickerAlter(0)
		setOctave(4)
		setOneNoteStaveClef("G")
	}
	const playSound = () => {
		const noteinstance = music12.factory.getNote(notePickerStep, notePickerAlter, octave).pitchValue
		player.triggerAttackRelease(Tone.Frequency(noteinstance + 12, "midi").toNote(), "2n", "+0")
	}
	return <>
		<div css={ConfigWindow_css}>
			<div className="top_config">
				<div className="option" onClick={resetConfig}>
					<GrPowerCycle size={iconSize} color={iconColor}/>
				</div>
				<div className="option" onClick={() => setIsOneNoteCheckerWindowOpen(true)}>
					<GrConfigure size={iconSize} color={iconColor}/>
				</div>
				<div className="option" onClick={playSound}>
					<AiOutlineSound size={iconSize} color={iconColor}/>
				</div>
			</div>
			<div className="btm_config">
				<div className="option" onClick={() => setOctave(octave - 1)}>
					八度降
				</div>
				<div className="option" onClick={() => setOctave(octave + 1)}>
					八度升
				</div>
				<div className="option" onClick={() => semitoneMove(-1)}>
					半音降
				</div>
				<div className="option" onClick={() => semitoneMove(1)}>
					半音升
				</div>
			</div>
		</div>
	</>
}

export default ConfigWindow

const ConfigWindow_css = css({
	...cssPresets.flexCenter,
	flexDirection: "column",
	marginTop: 10,
	userSelect: "none",
	"& .top_config": {
		flexDirection: "row",
		...cssPresets.flexCenter,
		gap: 20,
		"& .option": {
			width: 60,
			height: 60,
			border: `1px solid ${googleColors.gray300}`,
			backgroundColor: "white",
			borderRadius: 8,
			overflow: "hidden",
			...cssPresets.flexCenter,
			...cssPresets.transition,
			cursor: "pointer",
			userSelect: "none",
			"&:hover": {
				backgroundColor: isMobile ? void 0 : googleColors.gray200,
			},
			"&:active": {
				backgroundColor: googleColors.gray300
			}
		}
	},
	"& .btm_config": {
		...cssPresets.flexCenter,
		borderRadius: 8,
		overflow: "hidden",
		width: "fit-content",
		marginTop: 15,
		"& .option": {
			width: 85,
			backgroundColor: "white",
			height: 50,
			...cssPresets.flexCenter,
			userSelect: "none",
			cursor: "pointer",
			color: googleColors.blue800,
			
			...cssPresets.transition,
			"&:hover": {
				backgroundColor: isMobile ? void 0 : googleColors.gray200,
			},
			"&:active": {
				backgroundColor: googleColors.gray300
			}
		},
		"& .option:not(:first-of-type)": {
			borderLeft: `1px solid ${googleColors.gray300}`,
		}
	},

})
