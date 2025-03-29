/* eslint-disable no-mixed-spaces-and-tabs */

import getIntervalInfo from "@/apps/Interval/utils/getIntervalInfo.ts";
import stepList from "@/apps/Interval/utils/stepList.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIntervalConfig from "@/assets/stores/useIntervalConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import byDefault from "@/utils/byDefault.ts";
import {css} from "@emotion/react";
import {isUndefined} from "lodash";
import music12 from "@/music12";
import {useEffect, useMemo, useState} from "react";
import {FaArrowUp} from "react-icons/fa";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import {useWindowSize} from "react-use";



const rightSelectorWidth = 75
const maxRightAreaHeight = 480
const middleBarHeight = 80
const reverseSwitchWidth = 50
const reverseNoteSize = 28
const defaultNoteColor = googleColors.gray800
const PhoneReverseInterval = () => {
	const {height} = useWindowSize();
	const {naviBarHeight, notePickerStep, notePickerAlter, setNotePickerOpen} = useGlobalSettings();
	const {setIsReverse, isReverse} = useIntervalConfig();
	const restNoteList = useMemo(() => {
		return stepList.filter((step) => {
			return step !== notePickerStep
		}).reverse();
	}, [notePickerStep])


	useEffect(() => {
		if (!restNoteList.includes(notePickerStep)) {
			setReverseStep(restNoteList[0])
		}
	}, [notePickerStep, restNoteList])
	const [reverseStep, setReverseStep] = useState(restNoteList[0])
	const reverseCalcResultList = useMemo(() => {
		const result = {low: {}, high: {}}
		const baseNote = new music12.note.Note(notePickerStep as any, notePickerAlter as any)
		const lowNotes = [-1, 0, 1].map((x) => {
			return new music12.note.Note(reverseStep as any, x as any)
		}).map((x) => {
			if (x.pitchValue <= baseNote.pitchValue) {
				return x
			}
			return new music12.note.Note(x.step as any, x.alter as any, x.octave - 1)
		})
		const highNotes = [-1, 0, 1].map((x) => {
			return new music12.note.Note(reverseStep as any, x as any)
		}).map((x) => {
			if (x.pitchValue <= baseNote.pitchValue) {
				return new music12.note.Note(x.step as any, x.alter as any, x.octave + 1)
			}
			return x
		})
		lowNotes.map((x, i) => {
			try {
				result["low"][`n${i}`] = music12.interval.getIntervalByComparingNotes(x, baseNote)
			} catch (e) {
				result["low"][`n${i}`] = void 0
			}
		})
		highNotes.map((x, i) => {
			try {
				result["high"][`n${i}`] = music12.interval.getIntervalByComparingNotes(x, baseNote)
			} catch (e) {
				result["high"][`n${i}`] = void 0
			}
		})
		return result
	}, [notePickerAlter, notePickerStep, reverseStep])
	const intervalInfo = (k: string, n: string) => {
		const s1 = isUndefined(reverseCalcResultList[k][n]) ? "复杂音程" :
			getIntervalInfo(reverseCalcResultList[k][n]["cnPrefix"], reverseCalcResultList[k][n]["num"])
		const s2 = byDefault(reverseCalcResultList[k][n]?.semitoneGap, "?")
		return [s1, s2]
	}
	return <>
		<NotePicker/>
		<div css={phone_reverse_interval_css(height - naviBarHeight)}>
			<div className="left_main_frame">
				<div className="up_half half">
					<div className="notes_container">
						<div className="container1">
							<div className="note_window">
								<NoteText step={reverseStep} alter={1}    color={defaultNoteColor}
										  fontSize={reverseNoteSize}/>
							</div>
							<div className="description">
								<div className="interval_type">{intervalInfo("high", "n2")[0]}</div>
								<div className="semitone">{intervalInfo("high", "n2")[1]}</div>
							</div>
						</div>
						<div className="container1">
							<div className="note_window">
								<NoteText step={reverseStep} alter={0}  color={defaultNoteColor}
										  fontSize={reverseNoteSize}/>
							</div>
							<div className="description">
								<div className="interval_type">{intervalInfo("high", "n1")[0]}</div>
								<div className="semitone">{intervalInfo("high", "n1")[1]}</div>
							</div>
						</div>
						<div className="container1">
							<div className="note_window">
								<NoteText step={reverseStep} alter={-1} color={defaultNoteColor}
										  fontSize={reverseNoteSize}/>
							</div>
							<div className="description">
								<div className="interval_type">{intervalInfo("high", "n0")[0]}</div>
								<div className="semitone">{intervalInfo("high", "n0")[1]}</div>
							</div>
						</div>
					</div>
					<div className="arrow">
						<FaArrowUp size={30} color={googleColors.blue900}/>
					</div>
				</div>
				<div className="middle_bar">
					<div className="reverse_switch"
					     onClick={() => setIsReverse(!isReverse)}>
						<HiOutlineSwitchHorizontal size={23} color={googleColors.blue800}/>
					</div>
					<div className="selector"
					     onClick={() => setNotePickerOpen(true)}>
						<NoteText step={notePickerStep} alter={notePickerAlter} fontSize={40}/>
					</div>
				</div>
				<div className="down_half half">
					<div className="arrow">
						<FaArrowUp size={30} color={googleColors.blue900}/>
					</div>
					<div className="notes_container">
						<div className="container1">
							<div className="note_window">
								<NoteText step={reverseStep} alter={1} color={defaultNoteColor} fontSize={reverseNoteSize}/>
							</div>
							<div className="description">
								<div className="interval_type">{intervalInfo("low", "n2")[0]}</div>
								<div className="semitone">{intervalInfo("low", "n2")[1]}</div>
							</div>
						</div>
						<div className="container1">
							<div className="note_window">
								<NoteText step={reverseStep} alter={0} color={defaultNoteColor} fontSize={reverseNoteSize}/>
							</div>
							<div className="description">
								<div className="interval_type">{intervalInfo("low", "n1")[0]}</div>
								<div className="semitone">{intervalInfo("low", "n1")[1]}</div>
							</div>
						</div>
						<div className="container1">
							<div className="note_window">
								<NoteText step={reverseStep} alter={-1} color={defaultNoteColor} fontSize={reverseNoteSize}/>
							</div>
							<div className="description">
								<div className="interval_type">{intervalInfo("low", "n0")[0]}</div>
								<div className="semitone">{intervalInfo("low", "n0")[1]}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="right_picker">
				<div className="innerFrame">
					{restNoteList.map((x) => {
						return <div key={x} className="target_cell"
						            css={reverse_step_css(x === reverseStep)}
						            onClick={() => setReverseStep(x)}>
							<NoteText step={x} alter={0} fontSize={32}/>
						</div>
					})}
				</div>
			</div>
		</div>
	</>
}

export default PhoneReverseInterval

const phone_reverse_interval_css = (frameHeight: number) => css({
	width: "100%",
	height: "100%",
	overflow: "hidden",
	userSelect: "none",
	...cssPresets.flexCenter,
	"& .left_main_frame": {
		width: `calc(100% - ${rightSelectorWidth}px)`,
		height: "100%",
		userSelect: "none",
		"& .up_half": {
			width: "100%",
			height: `calc(50% - ${middleBarHeight / 2}px)`,
			display: "flex",
			flexDirection: "column",
			justifyContent: "end"
		},
		"& .middle_bar": {
			height: middleBarHeight,
			width: "100%",
			...cssPresets.flex,
			alignItems: "center",
			"& .reverse_switch": {
				width: reverseSwitchWidth,
				height: "80%",
				...cssPresets.flexCenter,
				overflow: "hidden",
				cursor: "pointer",
				...cssPresets.transition,
				backgroundColor: "white",
				borderTopRightRadius: 8,
				borderBottomRightRadius: 8,
				"&:active": {
					backgroundColor: googleColors.gray300
				}
			},
			"& .selector": {
				width: 125,
				height: 70,
				marginLeft: "auto",
				marginRight: "auto",
				...cssPresets.flexCenter,
				cursor: "pointer",
				border: `1px solid ${googleColors.gray300}`,
				borderRadius: 999,
				overflow: "hidden",
				backgroundColor: "white",
				...cssPresets.transition,
				"&:active": {
					backgroundColor: googleColors.gray300
				}
			}
		},
		"& .down_half": {
			width: "100%",
			height: `calc(50% - ${middleBarHeight / 2}px)`,
			display: "flex",
			flexDirection: "column",
			justifyContent: "start"
		},
		"& .half": {
			paddingLeft: reverseSwitchWidth,
			"& .arrow": {
				width: "100%",
				marginTop: 5,
				marginBottom: 5,
				...cssPresets.flexCenter,
			},
			"& .notes_container": {
				border: `1px solid ${googleColors.gray300}`,
				boxSizing: "border-box",
				width: "fit-content",
				marginLeft: "auto",
				marginRight: "auto",
				borderRadius: 10,
				overflow: "hidden",
				marginBottom: 5,
				marginTop: 5,
				"& .container1:not(:first-of-type)": {
					borderTop: `1px solid ${googleColors.gray300}`,
				},
				"& .container1": {
					width: "100%",
					height: 55,
					paddingLeft: 15,
					paddingRight: 15,
					backgroundColor: "white",
					...cssPresets.flexCenter,
					"& .note_window": {
						height: "100%",
						width: 35,
						...cssPresets.flexCenter,
						justifyContent: "start",
						fontSize: 25,
						color: googleColors.gray700
					},
					"& .description": {
						height: "100%",
						...cssPresets.flexCenter,
						color: googleColors.gray700,
						fontFamily: "misans-m",
						userSelect: "none",
						"&>.interval_type": {
							width: 120,
							fontSize: 18,
							fontFamily: "misans-m",
							color: googleColors.blueGray800,
							...cssPresets.flexCenter,
							justifyContent: "end",
							paddingRight: 10
						},
						"&>.semitone": {
							fontSize: 18,
							width: 25,
							fontFamily: "misans-m",
							...cssPresets.flexCenter,
							justifyContent: "end",
							color: googleColors.blue800
						}
					}
				}
			}
		}
	},
	"& .right_picker": {
		width: rightSelectorWidth,
		height: "100%",
		...cssPresets.flexCenter,

		"& .innerFrame": {
			height: frameHeight <= maxRightAreaHeight ? "100%" : maxRightAreaHeight,
			width: "100%",
			borderTopLeftRadius: frameHeight <= maxRightAreaHeight ? 0 : 8,
			borderBottomLeftRadius: frameHeight <= maxRightAreaHeight ? 0 : 8,
			border: `1px solid ${googleColors.gray300}`,
			borderRight: "none",
			overflow: "hidden",
			"&>.target_cell": {
				width: "100%",
				height: "calc(100% / 6)",
				...cssPresets.flexCenter,
				backgroundColor: "white",
				cursor: "pointer",
				borderBottom: `1px solid ${GoogleColors.gray300}`,
				...cssPresets.transition,
				overflow: "hidden",
				"&:active": {
					backgroundColor: GoogleColors.gray300
				},
				"&:last-child": {
					borderBottom: "none"
				}
			}
		}
	}
})
const reverse_step_css = (isSelected: boolean) => {
	return css({
		backgroundColor: isSelected ? `${googleColors.amber200}!important` : "white",
	})
}
