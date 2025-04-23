/* eslint-disable no-mixed-spaces-and-tabs */
import useInstrument from "@/assets/instruments/useInstrument.ts";
import findFirstIndexLessThanLeft from "@/utils/findFirstIndexLessThanLeft.ts";
import warningToast from "@/utils/warningToast.tsx";
import {css} from "@emotion/react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import Piano251 from "@/apps/Temp251/parts/Piano251.tsx";
import {isMobile} from "react-device-detect";
import * as Tone from "tone";

const asNumberFontSize = 30
const asNumberColor = googleColors.blue800
const Each251 = (props: {
	notesList: any[],
	as: number
}) => {
	const {notePickerStep, notePickerAlter, setNotePickerStep, setNotePickerAlter, playOctaveShift} = useGlobalSettings()
	const {player} = useInstrument()
	const playNotes = () => {
		let pitchList = props.notesList.map(x => x.pitchValue)
		const findi = findFirstIndexLessThanLeft(pitchList)
		if (findi !== -1) pitchList = [...pitchList.slice(0, findi), ...pitchList.slice(findi, pitchList.length).map(x => x + 12)]
		try {
			pitchList.forEach((n, i) => {
				const timeD = `+${i / 2}`
				player.triggerAttackRelease(Tone.Frequency(n + 12 * playOctaveShift, "midi").toNote(), "1n", timeD)
			})
		} catch (e) {
			warningToast("播放出错，请刷新或切换合成器音色")
		}
	}
	return <>
		<div css={Each251_css}>
			<div className="as">
				<div className="as_number">
					<NoteText step={notePickerStep}
					          alter={notePickerAlter}
					          color={asNumberColor}
					          fontSize={asNumberFontSize}/>
					={props.as}
				</div>
				<div className="notes_frame">
					{props.notesList.map((note) => <div
						onClick={() => {
							if (Math.abs(note.alter) === 2) return;
							setNotePickerStep(note.step)
							setNotePickerAlter(note.alter)
						}}
						key={note.locationId} className="each_note">
						<NoteText step={note.step}
						          alter={note.alter}
						          fontSize={35}/>
					</div>)}
				</div>
			</div>
			<div className="piano" onClick={playNotes}>
				<Piano251 notesList={props.notesList}/>
			</div>
		</div>
	</>
}

export default Each251

const Each251_css = css({
	"& .piano": {
		...cssPresets.transition
	},
	"& .piano:hover": isMobile ? {
		filter: "brightness(0.95)"
	} : null,
	"& .piano:active": {
		filter: "brightness(0.9)"
	},
	"& .as": {
		...cssPresets.flexCenter,
		marginBottom: 15,
		"& .as_number": {
			...cssPresets.flexCenter,
			fontSize: asNumberFontSize,
			color: asNumberColor,
			width: 90,
			justifyContent: "start"
		},
		"& .each_note": {
			width: 60,
			paddingTop: 10,
			paddingBottom: 10,
			backgroundColor: "white",
		},
		"& .notes_frame": {
			...cssPresets.flexCenter,
			borderRadius: 8,
			overflow: "hidden",
			"& .each_note:not(:first-of-type)": {
				borderLeft: `1px solid ${googleColors.gray200}`,
			},
			"& .each_note": {
				...cssPresets.defaultHoverAndActive as any
			}

		}
	}
})
