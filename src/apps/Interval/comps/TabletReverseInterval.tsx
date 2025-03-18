/* eslint-disable no-mixed-spaces-and-tabs */

import stepList from "@/apps/Interval/utils/stepList.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIntervalConfig from "@/assets/stores/useIntervalConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import byDefault from "@/utils/byDefault.ts";
import {css} from "@emotion/react";
import music12 from "music12";
import {useEffect, useMemo, useState} from "react";
import {isMobile} from "react-device-detect";
import {MdArrowDownward, MdArrowUpward} from "react-icons/md";
import {useWindowSize} from "react-use";
const defaultNoteColor = googleColors.gray800
const getReverseIntervalItem = (i: any, k: any, alter: number) => {
	try {
		if (alter === 0) return byDefault(i["natural"][k]["simpleDescription"], "复杂音程")
		if (alter === 1) return byDefault(i["sharp"][k]["simpleDescription"], "复杂音程")
		if (alter === -1) return byDefault(i["flat"][k]["simpleDescription"], "复杂音程")
	} catch (e) {
		return "复杂音程"
	}

}

const getReverseSemitone = (i: any, k: any, alter: number) => {
	try {
		if (alter === 0) return byDefault(i["natural"][k]["semitoneGap"], "?")
		if (alter === 1) return byDefault(i["sharp"][k]["semitoneGap"], "?")
		if (alter === -1) return byDefault(i["flat"][k]["semitoneGap"], "?")
	} catch (e) {
		return "?"
	}
}

const baseOctave = 4
const arrowColor_up = googleColors.red800
const arrowColor_down = googleColors.green800


const TabletReverseInterval = () => {
	const {width} = useWindowSize();
	const {notePickerStep, notePickerAlter, setNotePicker} = useGlobalSettings();
	const {isDoubleAlterShown} = useIntervalConfig();
	const [isDirectionArrowShow, setIsDirectionArrowShow] = useState(true)
	useEffect(() => {
		if (width <= 650) setIsDirectionArrowShow(false);
		else setIsDirectionArrowShow(true);
	}, [width])
	const reverseList = useMemo(() => {
		const baseNote = new music12.note.Note(notePickerStep as any, notePickerAlter as any, baseOctave);
		const result = []
		stepList.filter(x => x !== notePickerStep).map(x => {
			result.push({step: x, flat: {}, natural: {}, sharp: {}})
		})
		for (let i = 0; i < result.length; i++) {
			const naturalNote = new music12.note.Note(result[i].step as any, 0, baseOctave)
			if (naturalNote.pitchValue <= baseNote.pitchValue) {
				try {
					result[i]["natural"]["upward"] = music12.interval.getIntervalByComparingNotes(baseNote, naturalNote)
				} catch (e) {
					result[i]["natural"]["upward"] = void 0
				}
				try {
					result[i]["natural"]["downward"] = music12.interval.getIntervalByComparingNotes(baseNote,
						new music12.note.Note(result[i].step as any, 0, baseOctave + 1))
				} catch (e) {
					result[i]["natural"]["downward"] = void 0
				}
			} else {
				try {
					result[i]["natural"]["downward"] = music12.interval.getIntervalByComparingNotes(baseNote, naturalNote)
				} catch (e) {
					result[i]["natural"]["downward"] = void 0
				}
				try {
					result[i]["natural"]["upward"] = music12.interval.getIntervalByComparingNotes(baseNote,
						new music12.note.Note(result[i].step as any, 0, baseOctave - 1))
				} catch (e) {
					result[i]["natural"]["downward"] = void 0
				}
			}

			const flatNote = new music12.note.Note(result[i].step as any, -1, baseOctave)
			if (flatNote.pitchValue <= baseNote.pitchValue) {
				try {
					result[i]["flat"]["upward"] = music12.interval.getIntervalByComparingNotes(baseNote, flatNote)
				} catch (e) {
					result[i]["flat"]["upward"] = void 0
				}
				try {
					result[i]["flat"]["downward"] = music12.interval.getIntervalByComparingNotes(baseNote,
						new music12.note.Note(result[i].step as any, 0, baseOctave + 1))
				} catch {
					result[i]["flat"]["downward"] = void 0
				}
			} else {
				try {
					result[i]["flat"]["downward"] = music12.interval.getIntervalByComparingNotes(baseNote, flatNote)
				} catch (e) {
					result[i]["flat"]["downward"] = void 0
				}
				try {
					result[i]["flat"]["upward"] = music12.interval.getIntervalByComparingNotes(baseNote,
						new music12.note.Note(result[i].step as any, 0, baseOctave - 1))
				} catch (e) {
					result[i]["flat"]["downward"] = void 0
				}

			}

			const sharpNote = new music12.note.Note(result[i].step as any, 1, baseOctave)
			if (sharpNote.pitchValue <= baseNote.pitchValue) {
				try {
					result[i]["sharp"]["upward"] = music12.interval.getIntervalByComparingNotes(baseNote, sharpNote)
				} catch (e) {
					result[i]["sharp"]["downward"] = void 0
				}
				try {
					result[i]["sharp"]["downward"] = music12.interval.getIntervalByComparingNotes(baseNote,
						new music12.note.Note(result[i].step as any, 0, baseOctave + 1))
				} catch (e) {
					result[i]["sharp"]["downward"] = void 0
				}
			} else {
				try {
					result[i]["sharp"]["downward"] = music12.interval.getIntervalByComparingNotes(baseNote, sharpNote)
				} catch (e) {
					result[i]["sharp"]["downward"] = void 0
				}
				try {
					result[i]["sharp"]["upward"] = music12.interval.getIntervalByComparingNotes(baseNote,
						new music12.note.Note(result[i].step as any, 0, baseOctave - 1))
				} catch (e) {
					result[i]["sharp"]["downward"] = void 0
				}
			}
		}
		return result
	}, [notePickerAlter, notePickerStep]);
	return <div css={tablet_reverse_interval_css(isDirectionArrowShow, isDoubleAlterShown)}>
		<div className="title">
			<NoteText step={notePickerStep} alter={notePickerAlter}/>
			<span>到各个音符之间的上下行音程</span>
		</div>
		<div className="reverse_main">
			{reverseList.map((x, i) => <div className="column" key={i}>
				{[-1, 0, 1].map(y => <div className="line" key={y} onClick={() => setNotePicker(x.step as any, y as number)}>
						<div className="target_note">
							<NoteText step={x.step} alter={y} color={defaultNoteColor} fontSize={30}/>
						</div>
						<div className="interval_description">
							<div className="upward direction">
								<div className="icon">
									<MdArrowUpward size={13} color={arrowColor_up}/>
								</div>
								<div className="interval_text">{getReverseIntervalItem(x, "upward", y)}</div>
								<div className="semitone_gap">{getReverseSemitone(x, "upward", y)} </div>
							</div>
							<div className="downward direction">
								<div className="icon">
									<MdArrowDownward size={13} color={arrowColor_down}/>
								</div>
								<div className="interval_text">{getReverseIntervalItem(x, "downward", y)}</div>
								<div className="semitone_gap">{getReverseSemitone(x, "downward", y)}</div>
							</div>
						</div>
					</div>
				)}
			</div>)}
		</div>
	</div>
}

export default TabletReverseInterval

const tablet_reverse_interval_css = (isDirectionArrowShow: boolean, isDoubleAlterShow: boolean) => css({
	"& .picker_note_window": {
		backgroundColor: "white",
		height: "fit-content",
	},
	"& .column:not(:first-of-type)": {
		borderLeft: `1px solid ${googleColors.gray300}`
	},
	"& .title": {
		fontSize: 16,
		userSelect: "none",
		fontFamily: "misans-m",
		backgroundColor: "white",
		boxSizing: "border-box",
		border: `1px solid ${googleColors.gray300}`,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		overflow: "hidden",
		paddingTop: 5,
		paddingBottom: 5,
		...cssPresets.flexCenter,
		"& span": {
			fontFamily: "misans-m",
			fontSize: "inherit",
		}
	},
	"& .reverse_main": {
		borderRadius: 8,
		overflow: "hidden",
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		...cssPresets.flexCenter,
		border: `1px solid ${googleColors.gray300}`,
		borderTop: "none",
	},
	"& .column": {
		backgroundColor: "white",
		"& .line:not(:first-of-type)": {
			borderTop: `1px solid ${googleColors.gray300}`
		},
		"& .line": {
			transition: "background-color ease 0.1s",
			"&:hover": isMobile ? {} : {
				backgroundColor: googleColors.gray200
			}, "&:active": {
				backgroundColor: googleColors.gray300
			},
			cursor: "pointer",
			boxSizing: "border-box",
			userSelect: "none",
			paddingLeft: isDirectionArrowShow ? 5 : 2,
			paddingRight: isDirectionArrowShow ? 5 : 2,
			paddingTop: 3,
			paddingBottom: 5,
			minWidth: isDirectionArrowShow ? 100 : 85,
			width: isDoubleAlterShow ? 120 : "fit-content",
			maxWidth: 120,
			"& .target_note": {},
			"& .direction": {
				...cssPresets.flexCenter,
				"& .icon": {
					width: isDirectionArrowShow ? 13 : 0,
					height: isDirectionArrowShow ? 13 : 0,
					overflow: "hidden",
					...cssPresets.flexCenter,
					transition: "all ease 1s",
					transform: isDirectionArrowShow ? "scale(1)" : "scale(0)",
					opacity: isDirectionArrowShow ? 1 : 0,
				},
				fontFamily: "misans-m",
				"& .interval_text": {
					fontSize: 14,
					userSelect: "none",
					color: googleColors.gray800,
					width: 60,
					textAlign: "center",
				},
				"& .semitone_gap": {
					fontSize: 14,
					userSelect: "none",
					color: googleColors.blue800,
					width: 20,
					textAlign: "center",
					// backgroundColor:googleColors.red200
				}
			}
		}
	}
})
