/* eslint-disable no-mixed-spaces-and-tabs */
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useInstrument from "@/assets/instruments/useInstrument.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import UseScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12"
import findFirstIndexLessThanLeft from "@/utils/findFirstIndexLessThanLeft.ts";
import {css} from "@emotion/react";
import collect from "collect.js";
import {range, reverse} from "lodash";
import {useMemo, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {AiFillSound, AiFillWarning, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import * as Tone from "tone";


const MobileScalePlay = (props: {}) => {
	const {player, isLoaded} = useInstrument()
	const {mode} = UseScaleConfig()
	const {scaleInstance} = useScaleInstance()
	const [octaveShift, setOctaveShift] = useState(0)
	const {chordPlayStyle} = useGlobalSettings()
	const playList = useMemo(() => {
		if (mode === music12.scale.ScaleMode.MelodicMajorDescending) {
			const majScale = music12.factory.getScale(scaleInstance.rootNote.step, scaleInstance.rootNote.alter, scaleInstance.rootNote.octave, music12.scale.ScaleMode.NaturalMajor)
			const upNotesList = majScale.notesList.map(x => Tone.Frequency(x.pitchValue + octaveShift * 12, "midi").toNote())
			const downNotesList = scaleInstance.notesList.map(x => Tone.Frequency(x.pitchValue + octaveShift * 12, "midi").toNote())
			return [...upNotesList, Tone.Frequency(scaleInstance.rootNote.pitchValue + 12 + octaveShift * 12, "midi").toNote(), ...reverse(downNotesList)]
		}
		if (mode === music12.scale.ScaleMode.MelodicMinorAscending) {
			const minScale = music12.factory.getScale(scaleInstance.rootNote.step, scaleInstance.rootNote.alter, scaleInstance.rootNote.octave, music12.scale.ScaleMode.NaturalMinor)
			const upNotesList = scaleInstance.notesList.map(x => Tone.Frequency(x.pitchValue + octaveShift * 12, "midi").toNote())
			const downNotesList = minScale.notesList.map(x => Tone.Frequency(x.pitchValue + octaveShift * 12, "midi").toNote())
			return [...upNotesList, Tone.Frequency(scaleInstance.rootNote.pitchValue + 12 + octaveShift * 12, "midi").toNote(), ...reverse(downNotesList)]
		}
		const notesList = scaleInstance.notesList.map(x => Tone.Frequency(x.pitchValue + octaveShift * 12, "midi").toNote())
		return [...notesList, Tone.Frequency(scaleInstance.rootNote.pitchValue + 12 + octaveShift * 12, "midi").toNote(), ...reverse(notesList)]
	},[mode, scaleInstance, octaveShift])
	const handleOctaveShift = (value: number) => {
		setOctaveShift(prev => {
			if (prev + value > 3) return 3
			if (prev + value < -3) return -3
			return prev + value
		})
	}
	const playScale = () => {
		playList.forEach((note, index) => {
			const timeAlter = "+" + index / 5
			player.triggerAttackRelease(note, '4n', timeAlter)
		})
	}

	const playChord = (chordDegree: number, isChord3: boolean) => {
		if (!isLoaded) {
			toast("乐器尚未加载成功，请等待或切换合成器音色", {
				duration: 5000,
				icon: <AiFillWarning color={googleColors.red300}/>, style: {
					boxShadow: "0 0 10px rgba(0,0,0,0.05  )",
				}
			})
			return;
		}
		const chordNotes = isChord3 ? scaleInstance.getScaleDegreeChord3(chordDegree).notesList : scaleInstance.getScaleDegreeChord7(chordDegree).notesList
		const pitchList = chordNotes.map(x => Tone.Frequency(x.pitchValue + octaveShift * 12, "midi").toNote())
		const playStyle = collect(chordPlayStyle).random()
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
	}
	return <>
		<Toaster/>
		<div css={MobileScalePlay_css}>
			{/* =====================  调整整体八度  =================================*/}
			<div className="octave_shift">
				<div className="move" onClick={() => handleOctaveShift(-1)}>
					<AiOutlineMinus size={30}
					                color={googleColors.blue800}/></div>
				<div style={{
					borderLeft: `1px solid ${googleColors.gray300}`,
					borderRight: `1px solid ${googleColors.gray300}`,
					width: 120, ...cssPresets.flexCenter, height: 50,
				}}>
					<div style={{marginRight: 10}}>八度</div>
					<div style={{
						fontSize: 25,
						color: googleColors.blue800
					}}>{octaveShift >= 0 ? `+${octaveShift}` : `${octaveShift}`}</div>
				</div>
				<div className="move" onClick={() => handleOctaveShift(1)}>
					<AiOutlinePlus size={30}
					               color={googleColors.blue800}/></div>
			</div>
			{/* =====================  播放音阶  =================================*/}
			<div className="play_scale" onClick={playScale}>
				<AiFillSound size={25} color={googleColors.blue800}/>
				音阶声响效果
			</div>
			{/* ======================== 播放调内三和弦 -============================*/}
			<div className="play_chord">
				<table>
					<tbody>
					<tr>
						<td style={{backgroundColor: googleColors.blueGray50}}>
							<div>调内</div>
							<div>三和弦</div>
						</td>
						{range(3).map(x => <td key={x}>
							<div className="inner_chord" onClick={() => playChord(x + 1, true)}>
								<AiFillSound size={20} color={googleColors.blue800}/>
								<div className="num">{x + 1}级</div>
							</div>
						</td>)}
					</tr>
					<tr>
						{range(4).map(x => <td key={x}>
							<div className="inner_chord" onClick={() => playChord(x + 4, true)}>
								<AiFillSound size={20} color={googleColors.blue800}/>
								<div className="num">{x + 4}级</div>
							</div>
						</td>)}
					</tr>
					</tbody>
				</table>
			</div>
			{/* ======================== 播放调内七和弦 -============================*/}
			<div className="play_chord">
				<table>
					<tbody>
					<tr>
						<td style={{backgroundColor: googleColors.blueGray50}}>
							<div>调内</div>
							<div>七和弦</div>
						</td>
						{range(3).map(x => <td key={x}>
							<div className="inner_chord" onClick={() => playChord(x + 1, false)}>
								<AiFillSound size={20} color={googleColors.blue800}/>
								<div className="num">{x + 1}级</div>
							</div>
						</td>)}
					</tr>
					<tr>
						{range(4).map(x => <td key={x}>
							<div className="inner_chord" onClick={() => playChord(x + 4, false)}>
								<AiFillSound size={20} color={googleColors.blue800}/>
								<div className="num">{x + 4}级</div>
							</div>
						</td>)}
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</>
}

export default MobileScalePlay

const MobileScalePlay_css = css({
	...cssFunctions.px(25),
	height: "calc(70vh)",
	"&>.play_scale": {
		width: "100%",
		backgroundColor: "white",
		borderRadius: 8,
		userSelect: "none",
		...cssPresets.flexCenter,
		height: 50,
		gap: 10,
		...cssPresets.defaultHoverAndActive as any,
		...cssPresets.transition
	},
	"&>.octave_shift": {
		width: "fit-content",
		marginBottom: 15,
		...cssPresets.mxAuto,
		backgroundColor: "white",
		borderRadius: 999,
		overflow: "hidden",
		...cssPresets.flexCenter,
		"&>.move": {
			width: 60,
			height: 50,
			overflow: "hidden",
			...cssPresets.flexCenter,
			...cssPresets.defaultHoverAndActive as any,
			...cssPresets.transition,

		}
	},
	"& .play_chord": {
		width: "100%",
		marginTop: 15,
		...cssPresets.flexCenter,
		table: {
			width: "100%",
			borderCollapse: "collapse",
			borderSpacing: 0,
			tableLayout: "fixed",
			borderRadius: 10,
			overflow: "hidden",
			"& td": {
				border: `1px solid ${googleColors.gray300}`,
				backgroundColor: "white",
				height: 60,

				"& .inner_chord": {
					...cssPresets.flexCenter,
					height: "100%",
					...cssPresets.defaultHoverAndActive as any,
					...cssPresets.transition,
					userSelect: "none",
					"&>.num": {
						fontSize: 20,
						color: googleColors.blue800,
						marginLeft: 5,
					}
				}
			}
		}
	}
})
