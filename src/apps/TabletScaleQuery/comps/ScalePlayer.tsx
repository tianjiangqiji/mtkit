/* eslint-disable no-mixed-spaces-and-tabs */
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useInstrument from "@/assets/instruments/useInstrument.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import UseScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12";
import warningToast from "@/utils/warningToast.tsx";
import {css} from "@emotion/react";
import {reverse} from "lodash";
import {useMemo} from "react";
import {Toaster} from "react-hot-toast";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BsPlayFill} from "react-icons/bs";
import * as Tone from "tone";

const ScalePlayer = () => {
	const {playOctaveShift, setPlayOctaveShift} = useGlobalSettings()
	const {player, isLoaded} = useInstrument()
	const {mode} = UseScaleConfig()
	const {chordPlayStyle} = useGlobalSettings()
	const {scaleInstance} = useScaleInstance()
	const playList = useMemo(() => {
		if (mode === music12.scale.ScaleMode.MelodicMajorDescending) {
			const majScale = music12.factory.getScale(scaleInstance.rootNote.step, scaleInstance.rootNote.alter, scaleInstance.rootNote.octave, music12.scale.ScaleMode.NaturalMajor)
			const upNotesList = majScale.notesList.map(x => Tone.Frequency(x.pitchValue + playOctaveShift * 12, "midi").toNote())
			const downNotesList = scaleInstance.notesList.map(x => Tone.Frequency(x.pitchValue + playOctaveShift * 12, "midi").toNote())
			return [...upNotesList, Tone.Frequency(scaleInstance.rootNote.pitchValue + 12 + playOctaveShift * 12, "midi").toNote(), ...reverse(downNotesList)]
		}
		if (mode === music12.scale.ScaleMode.MelodicMinorAscending) {
			const minScale = music12.factory.getScale(scaleInstance.rootNote.step, scaleInstance.rootNote.alter, scaleInstance.rootNote.octave, music12.scale.ScaleMode.NaturalMinor)
			const upNotesList = scaleInstance.notesList.map(x => Tone.Frequency(x.pitchValue + playOctaveShift * 12, "midi").toNote())
			const downNotesList = minScale.notesList.map(x => Tone.Frequency(x.pitchValue + playOctaveShift * 12, "midi").toNote())
			return [...upNotesList, Tone.Frequency(scaleInstance.rootNote.pitchValue + 12 + playOctaveShift * 12, "midi").toNote(), ...reverse(downNotesList)]
		}
		const notesList = scaleInstance.notesList.map(x => Tone.Frequency(x.pitchValue + playOctaveShift * 12, "midi").toNote())
		return [...notesList, Tone.Frequency(scaleInstance.rootNote.pitchValue + 12 + playOctaveShift * 12, "midi").toNote(), ...reverse(notesList)]
	}, [mode, scaleInstance, playOctaveShift])

	const playScale = () => {
		try {
			playList.forEach((note, index) => {
				const timeAlter = "+" + index / 5
				player.triggerAttackRelease(note, '4n', timeAlter)
			})
		} catch (e) {
			warningToast("播放失败，请刷新或切换为合成器音色")
		}

	}
	const handleOctaveShift = (shift: number) => {
		if (playOctaveShift + shift >= -3 && playOctaveShift + shift <= 3) {
			setPlayOctaveShift(playOctaveShift + shift)
		} else if (shift > 0) {
			setPlayOctaveShift(3)
		} else if (shift < 0) {
			setPlayOctaveShift(-3)
		}
	}
	return <>
		<Toaster/>
		<div css={ScalePlayer_css}>
			<div className="octave_shift">
				<div className="move" onClick={() => handleOctaveShift(-1)}>
					<AiOutlineMinus size={25}
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
					}}>{playOctaveShift >= 0 ? `+${playOctaveShift}` : `${playOctaveShift}`}</div>
				</div>
				<div className="move" onClick={() => handleOctaveShift(1)}>
					<AiOutlinePlus size={25}
					               color={googleColors.blue800}/></div>
			</div>
			<div className="play_scale" onClick={playScale}>
				<BsPlayFill size={25} color={googleColors.blue800}/>
				音阶声响效果
			</div>
		</div>
	</>
}

export default ScalePlayer

const ScalePlayer_css = css({
	width: "fit-content",
	height: 45,
	marginBottom: 10,
	...cssPresets.mxAuto,
	...cssPresets.flexCenter,
	gap: 25,
	"&>.octave_shift": {
		width: 200,
		height: "100%",
		...cssPresets.mxAuto,
		backgroundColor: "white",
		borderRadius: 999,
		overflow: "hidden",
		...cssPresets.flexCenter,
		"&>.move": {
			width: 60,
			height: "100%",
			overflow: "hidden",
			...cssPresets.flexCenter,
			...cssPresets.defaultHoverAndActive as any,
			...cssPresets.transition,

		}
	},
	"& .play_scale": {
		...cssPresets.flexCenter,
		height: "100%",
		backgroundColor: "white",
		borderRadius: 999,
		paddingRight: 30,
		gap: 10,
		paddingLeft: 25,
		...cssPresets.defaultHoverAndActive as any,
		...cssPresets.transition,

	}
})
