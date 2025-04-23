/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import * as music12 from "@/music12";
import googleColors from "@/assets/colors/googleColors.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import {reverse} from "lodash";
import {useWindowSize} from "react-use";
import useChord from "@/apps/ChordDisplay/useChord.ts";
import React, {useMemo} from "react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";


const ChordOctaveShiftPopup = () => {
	// const {isNotePickerOpen, setNotePickerOpen} = useGlobalSettings();
	const {
		isChordOctaveShiftOpen, setIsChordOctaveShiftOpen
	} = useChordConfig()

	const {chord, shiftOneOctave, resetOctave, staveOctaveMove} = useChord()
	const givenItv = (i: number) => {
		const itv = music12.interval.getIntervalByComparingNotes(chord.rootNote, chord.notesList[i])
		const itvDes = itv.cnPrefix
		const degree = itv.num
		return `${itvDes}${degree}`
	}
	const windowColumn = useMemo(() => reverse(chord.notesList), [chord])
	const noteInterval = (i: number) => {
		const j = givenItv(windowColumn.length - i - 1)
		if (j === "纯1") return "根音"
		return `${j}度`
	}
	const {height} = useWindowSize();
	const columnHeight = chord.notesList.length * 115 + 50
	return (<>
		<Mask visible={isChordOctaveShiftOpen}
		      style={{...cssPresets.defaultBlur, width: "calc(100vw)", height: "calc(100vh)", overflow: "hidden"}}
		      opacity={0.5}
		      destroyOnClose={true}>
			<div css={note_picker_css(height <= columnHeight + 50, columnHeight)}
			     onClick={() => setIsChordOctaveShiftOpen(false)}>
				<div className="inner_frame">
					{windowColumn.map((x, y) => <div key={y} className="line">
						<div className="window">
							<NoteText fontSize={25} step={x.step} alter={x.alter}/>
							<div className="des">{noteInterval(y)}</div>
						</div>
						<div className="options">
							<div className="up option" onClick={() => shiftOneOctave(chord.notesList.length - 1 - y, 1)}>
								<BiSolidUpArrow style={{marginRight: 5}}/>
								上升八度
							</div>
							<div className="down option" onClick={() => shiftOneOctave(chord.notesList.length - 1 - y, -1)}>
								<BiSolidDownArrow style={{marginRight: 5}}/>
								下降八度
							</div>
						</div>
					</div>)}


					<div className="octave_whole">
						<div className="each" onClick={() => staveOctaveMove(1)}>全升</div>
						<div className="each" onClick={resetOctave}>重置</div>
						<div className="each" onClick={() => staveOctaveMove(-1)}>全降</div>
					</div>

				</div>
			</div>
		</Mask>
	</>)

}

export default ChordOctaveShiftPopup

const note_picker_css = (isLonger: boolean, columnH: number) => css({
	userSelect: "none",
	width: "calc(100vw)",
	overflowX: "auto",
	height: "calc(100vh)",
	maxHeight: "calc(100vh)",
	zIndex: 999,
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	overflowY: "auto",
	scrollbarColor: `${googleColors.blue300} ${googleColors.red300}` as any,
	display: isLonger ? "block" : "flex",
	flexDirection: "column",
	justifyContent: "center",
	"& .inner_frame": {
		height: columnH,
		width: "100%",
		marginBottom: isLonger ? 100 : 0,
		marginTop: isLonger ? 100 : 0,
		// overflow:"hidden",
		userSelect: "none",
		"& .line": {
			...cssPresets.flexCenter,
			paddingTop: 5,
			minHeight: 100,
			maxHeight: 100,
			paddingBottom: 5,
			flexDirection: "column",
			marginBottom: 15,
			"& .window": {
				...cssPresets.flexCenter,
				paddingTop: 8,
				paddingBottom: 8,
				paddingLeft: 20,
				paddingRight: 20,
				borderRadius: 999,
				backgroundColor: googleColors.gray50,
				"& .des": {
					width: 65,
					marginLeft: 10,
					color: googleColors.red400,
				}
			},
			"& .options": {
				...cssPresets.flexCenter,
				marginTop: 5,
				borderRadius: 8,
				overflow: "hidden",
				"& .option:not(:first-of-type)": {
					borderLeft: `1px solid ${GoogleColors.gray300}`
				},
				"& .option": {
					backgroundColor: "white",
					width: 130,
					height: 40,
					fontSize: 18,
					...cssPresets.flexCenter,
					color: googleColors.blue800,
					...cssPresets.defaultHoverAndActive as any
				}
			},
		}
	},

	"& .octave_whole": {
		...cssPresets.flexCenter,
		...cssPresets.mxAuto,
		marginTop: 10,
		width: 270,
		minHeight: 50,
		maxHeight: 50,
		borderRadius: 999,
		border: `1px solid ${GoogleColors.gray600}`,
		backgroundColor: "white",
		color: googleColors.blue800,
		overflow: "hidden",
		"&>.each:not(:first-of-type)": {
			borderLeft: `1px solid ${GoogleColors.gray400}`,

		},
		"&>.each": {
			width: "33.3%",
			height: 50,
			...cssPresets.flexCenter,
			...cssPresets.defaultHoverAndActive as any,
			...cssPresets.transition,
			backgroundColor: googleColors.gray200,
			color: googleColors.gray600
		},

	}
})
