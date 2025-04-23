/* eslint-disable no-mixed-spaces-and-tabs */
import useInstrument from "@/assets/instruments/useInstrument.ts";
import warningToast from "@/utils/warningToast.tsx";
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import UseScaleConfig from "@/assets/stores/useScaleConfig.ts";
import collect from "collect.js";
import * as Tone from "tone";
import useScaleInstance from "../useTabletScaleQuery/useScaleInstance.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";
import {range, reverse} from "lodash";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import NoteChordSymbol from "@/components/reNote/ChordText/NoteChordSymbol.tsx";
import NumberChordSymbol from "@/components/reNote/ChordText/NumberChordSymbol.tsx";
import {isMobile} from "react-device-detect";

const chordFontSize = 22
const numberNoteColor = googleColors.blue800
const numberNoteFontSize = 18
const equalScaleFontSize = 25
const equalScaleColor = googleColors.deepOrange700
const ScaleNotesTable = () => {
	const {setNotePickerStep, setNotePickerAlter, chordPlayStyle, playOctaveShift} = useGlobalSettings()
	const {isRomeNumberStyle, chordDisplayStyle} = UseScaleConfig()
	const {scaleInstance} = useScaleInstance()
	const {player, isLoaded} = useInstrument()
	const playChord = (chordDegree: number, isChord3: boolean) => {
		if (!isLoaded) {
			warningToast("乐器尚未加载成功，请等待或切换合成器音色")
			return;
		}
		const chordNotes = isChord3 ? scaleInstance.getScaleDegreeChord3(chordDegree).notesList : scaleInstance.getScaleDegreeChord7(chordDegree).notesList
		const pitchList = chordNotes.map(x => Tone.Frequency(x.pitchValue + playOctaveShift * 12, "midi").toNote())
		const playStyle = collect(chordPlayStyle).random()
		try {
			if (playStyle === "column") {
				player.triggerAttackRelease(pitchList, "2n")
			} else if (playStyle === "split_up") {
				pitchList.forEach((note, index) => {
					const timeAlter = "+" + index / 10
					player.triggerAttackRelease(note, '4n', timeAlter)
				})
			} else {
				reverse(pitchList).forEach((note, index) => {
					const timeAlter = "+" + index / 10
					player.triggerAttackRelease(note, '4n', timeAlter)
				})
			}
		} catch (e) {
			warningToast("播放失败，请刷新或改为合成器音色")
			console.log(e)
		}
	}
	return <>
		<div css={ScaleNotesTable_css(isRomeNumberStyle, scaleInstance.isTonicReplaced)}>
			{/*普通表格*/}
			<table>
				<tbody>
				<tr className="first_line">
					<td className="i1">
						<div className="cn_name">主</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={0} color={numberNoteColor}
							            align={"start"} num={1}/></div>
					</td>
					<td className="i2">
						<div className="cn_name">上主</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={scaleInstance.alterList[1]}
							            color={numberNoteColor} num={2}/></div>
					</td>
					<td className="i3">
						<div className="cn_name">中</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={scaleInstance.alterList[2]}
							            color={numberNoteColor}
							            num={3}/>
						</div>
					</td>
					<td className="i4">
						<div className="cn_name">下属</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={scaleInstance.alterList[3]}
							            color={numberNoteColor}
							            num={4}/>
						</div>
					</td>
					<td className="i5">
						<div className="cn_name">属</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={scaleInstance.alterList[4]}
							            color={numberNoteColor}
							            num={5}/>
						</div>
					</td>
					<td className="i6">
						<div className="cn_name">下中</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={scaleInstance.alterList[5]}
							            color={numberNoteColor}
							            num={6}/>
						</div>
					</td>
					<td className="i7">
						<div className="cn_name">导</div>
						<div className="num_des">
							<NumberNote fontSize={numberNoteFontSize}
							            isRomeStyle={isRomeNumberStyle}
							            alter={scaleInstance.alterList[6]}
							            color={numberNoteColor}
							            num={7}/>
						</div>
					</td>
				</tr>
				<tr className="note_line">
					{range(7).map(x => <td key={x} onClick={() => {
						setNotePickerStep(scaleInstance.notesList[x].step)
						setNotePickerAlter(scaleInstance.notesList[x].alter)
					}}>
						<NoteText step={scaleInstance.notesList[x].step}
						          alter={scaleInstance.notesList[x].alter}
						          fontSize={25}/></td>)}
				</tr>
				<tr>
					{range(7).map(x => {
						if (chordDisplayStyle === "note") return <td key={x} onClick={() => playChord(x + 1, true)}>
							<NoteChordSymbol
								step={scaleInstance.notesList[x].step}
								alter={scaleInstance.notesList[x].alter}
								fontSize={chordFontSize} color={googleColors.gray800}
								chordSymbol={scaleInstance.getScaleDegreeChord3(x + 1).baseSymbol}/></td>
						else return <td key={x} onClick={() => playChord(x + 1, true)}>
							<NumberChordSymbol
								isRomeStyle={chordDisplayStyle === "rome"}
								num={x + 1}
								alter={scaleInstance.alterList[x]}
								fontSize={chordFontSize} color={googleColors.gray800}
								chordSymbol={scaleInstance.getScaleDegreeChord3(x + 1).baseSymbol}/>
						</td>
					})}
				</tr>
				<tr>
					{range(7).map(x => {
						if (chordDisplayStyle === "note") return <td key={x} onClick={() => playChord(x + 1, false)}>
							<NoteChordSymbol
								step={scaleInstance.notesList[x].step}
								alter={scaleInstance.notesList[x].alter}
								fontSize={chordFontSize} color={googleColors.gray800}
								chordSymbol={scaleInstance.getScaleDegreeChord7(x + 1).baseSymbol}/></td>
						else return <td key={x} onClick={() => playChord(x + 1, false)}>
							<NumberChordSymbol
								isRomeStyle={chordDisplayStyle === "rome"}
								num={x + 1}
								alter={scaleInstance.alterList[x]}
								fontSize={chordFontSize} color={googleColors.gray800}
								chordSymbol={scaleInstance.getScaleDegreeChord7(x + 1).baseSymbol}/>
						</td>
					})}
				</tr>
				</tbody>
			</table>
			{/*等音阶提示*/}
			{scaleInstance.isTonicReplaced && <div
				onClick={() => {
					setNotePickerStep(scaleInstance.equalRootNote.step)
					setNotePickerAlter(scaleInstance.equalRootNote.alter)
				}}
				className="tonic_replaced">
				<div className="desc">该音阶存在等音阶</div>
				<div className="equal_scale">
					<div className="note_frame">
						<NoteText step={scaleInstance.equalRootNote.step}
						          alter={scaleInstance.equalRootNote.alter}
						          color={equalScaleColor}
						          fontSize={equalScaleFontSize}/>
					</div>
					<div className={"mode_name"}>{scaleInstance.modeName}</div>
				</div>

			</div>}
		</div>
	</>
}

export default ScaleNotesTable

const ScaleNotesTable_css = (i: boolean, isTonicReplaced: boolean) => css({
	"& table": {
		borderCollapse: "collapse",
		borderSpacing: 0,
		border: `1px solid ${isTonicReplaced ? googleColors.gray500 : googleColors.gray300}`,
		marginLeft: "auto",
		marginRight: "auto",
		userSelect: "none",
		borderRadius: 8,
		boxSizing: "border-box",
		tabSize: "initial",
		tableLayout: "fixed",
		overflow: "hidden",
		"& tr:not(:first-of-type)": {
			borderTop: `1px solid ${isTonicReplaced ? googleColors.gray400 : googleColors.gray200}`,
			"& td": {
				...cssPresets.defaultHoverAndActive as any,
			}
		},
		"& tr.first_line": {
			"& td": {
				...cssPresets.flexCenter,
				height: 32,
				"& .num_des": {
					...cssPresets.flexCenter,
					width: "fit-content",
					marginTop: i ? -3 : 0,
				},
				"& .cn_name": {
					fontSize: 16, fontFamily: "misans-m",
					marginRight: 5,
					color: googleColors.gray700
				},
			}
		},
		"& tr": {
			...cssPresets.flexCenter,
			"& td:not(:first-of-type)": {
				borderLeft: `1px solid ${isTonicReplaced ? googleColors.gray400 : googleColors.gray300}`,
			},
			"& td": {
				...cssPresets.flexCenter,
				backgroundColor: isTonicReplaced ? googleColors.amber50 : "white",
				height: 40,
				width: "calc(100vw / 7)",
				maxWidth: 80,
			}
		},
	},
	".tonic_replaced": {
		userSelect: "none",
		fontFamily: "misans-m",
		backgroundColor: googleColors.amber200,
		border: `1px solid ${googleColors.amber300}`,
		marginLeft: "auto",
		marginRight: "auto",
		width: "calc(80vw)",
		maxWidth: 500,
		marginTop: 15,
		marginBottom: 15,
		borderRadius: 8,
		padding: 15,
		boxSizing: "border-box",
		cursor: "pointer",
		...cssPresets.transition,
		"&:hover": isMobile ? {} : {
			backgroundColor: googleColors.amber300,
		},
		"&:active": {
			backgroundColor: googleColors.amber400,
		},
		"& .desc": {
			color: googleColors.amber900
		},
		"& .note_frame": {
			marginRight: 10
		},
		"& .equal_scale": {
			...cssPresets.flexCenter,
			marginTop: 5,
			color: equalScaleColor,
			"& .mode_name": {
				fontSize: equalScaleFontSize
			}
		}
	}
})
