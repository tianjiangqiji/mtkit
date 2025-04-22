/* eslint-disable no-mixed-spaces-and-tabs */
import ChordPlayStyleCard from "@/apps/Settings/components/ChordPlayStyleCard.tsx";
import instrumentsObj from "@/apps/Settings/datas/instrumentsObj.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import strings_ins_svg from "@/assets/instruments/instrument_imgs/cello.svg"
import epiano_ins_svg from "@/assets/instruments/instrument_imgs/ep.svg"
import flute_ins_svg from "@/assets/instruments/instrument_imgs/flute.svg"
import fx_ins_svg from "@/assets/instruments/instrument_imgs/fx.svg"
import guitar_ins_svg from "@/assets/instruments/instrument_imgs/guitar.svg"
import harp_ins_svg from "@/assets/instruments/instrument_imgs/harp.svg"
import piano_ins_svg from "@/assets/instruments/instrument_imgs/piano.svg"
import useEPianoSampler from "@/assets/instruments/samplers/useEPianoSampler.ts";
import useFluteSampler from "@/assets/instruments/samplers/useFluteSampler.ts";
import useGuitarSampler from "@/assets/instruments/samplers/useGuitarSampler.ts";
import useHarpSampler from "@/assets/instruments/samplers/useHarpSampler.ts";
import usePianoSampler from "@/assets/instruments/samplers/usePianoSampler.ts";
import useStringsSampler from "@/assets/instruments/samplers/useStringsSampler.ts";
import useDingDongSynth from "@/assets/instruments/synths/useDingDongSynth.ts";
import useSineSynth from "@/assets/instruments/synths/useSineSynth.ts";
import useWarmSynth from "@/assets/instruments/synths/useWarmSynth.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssFunctions from "@/assets/styles/cssFunctions.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import SoundPicker from "@/components/reSound/soundPicker/SoundPicker.tsx";
import {css} from "@emotion/react";
import {useMemo} from "react";

const maxW = 110

const notesList1 = ["C3", "E3", "G3", "C4", "E4", "C5"]
const SoundConfig = (props: {}) => {
	const guitarSampler = useGuitarSampler()
	const pianoSampler = usePianoSampler()
	const ePianoSampler = useEPianoSampler()
	const stringsSampler = useStringsSampler()
	const fluteSampler = useFluteSampler()
	const harpSampler = useHarpSampler()
	const warmSynth = useWarmSynth()
	const sineSynth = useSineSynth()
	const dingDongSynth = useDingDongSynth()
	const {setMainVolume, instrument, setInstrument, chordPlayStyle, setChordPlayStyle} = useGlobalSettings()
	const setRandomVolume = () => {
		setMainVolume(0)
	}
	const forbiddenPlayStyle = useMemo(() => {
		return {
			column: false,
			split_up: false,
			split_down: false,
		}
	}, [instrument])
	const harpSamplerClick = () => {
		setInstrument(instrumentsObj.harp)
		notesList1.forEach((note, index) => {
			const timeAlter = "+" + index / 10
			harpSampler.player.triggerAttackRelease(note, '4n', timeAlter)
		})
	}
	const pianoSamplerClick = () => {
		setInstrument(instrumentsObj.piano)
		notesList1.forEach((note, index) => {
			pianoSampler.player.triggerAttackRelease(note, '4n', '+0.' + index)
		})
	}

	const guitarSamplerClick = () => {
		setInstrument(instrumentsObj.guitar)
		notesList1.forEach((note, index) => {
			guitarSampler.player.triggerAttackRelease(note, '4n', '+0.' + index)
		})
	}

	const stringSamplerClick = () => {
		setInstrument(instrumentsObj.strings)
		// setChordPlayStyle(chordPlayStyle.filter(x => x !== "split_up" && x !== "split_down"))
		stringsSampler.player.triggerAttackRelease(notesList1, '2n')
	}

	const EPianoSamplerClick = () => {
		setInstrument(instrumentsObj.ePiano)
		notesList1.forEach((note, index) => {
			ePianoSampler.player.triggerAttackRelease(note, '4n', '+0.' + index)
		})
	}

	const fluteSamplerClick = () => {
		setInstrument(instrumentsObj.flute)
		fluteSampler.player.triggerAttackRelease(notesList1, '2n')
	}
	const dingDongSynthClick = () => {
		setInstrument(instrumentsObj.dingDongSynth)
		notesList1.forEach((note, index) => {
			dingDongSynth.player.triggerAttackRelease(note, '4n', '+0.' + index)
		})
	}

	const sineSynthClick = () => {
		setInstrument(instrumentsObj.sineSynth)
		notesList1.forEach((note, index) => {
			sineSynth.player.triggerAttackRelease(note, '4n', '+0.' + index)
		})
	}

	const warmSynthClick = () => {
		setInstrument(instrumentsObj.warmSynth)
		warmSynth.player.triggerAttackRelease(["C2", "E2", "G2", ...notesList1], '2n')
	}
	return <>
		<div css={SoundConfig_css}>
			<div style={{marginBottom: 10, color: googleColors.blue800}}>声音选择</div>
			<div className="picker_frame">
				<SoundPicker
					maxW={maxW}
					isLoaded={pianoSampler.isLoaded}
					isSelected={instrument === instrumentsObj.piano}
					img={piano_ins_svg}
					title={"钢琴"}
					onClick={pianoSamplerClick}/>
				<SoundPicker
					maxW={maxW}
					isSelected={instrument === instrumentsObj.ePiano}
					title={"电钢琴"}
					img={epiano_ins_svg}
					isLoaded={ePianoSampler.isLoaded}
					onClick={EPianoSamplerClick}/>
				<SoundPicker
					isLoaded={guitarSampler.isLoaded}
					maxW={maxW}
					title={"吉他"}
					isSelected={instrument === instrumentsObj.guitar}
					img={guitar_ins_svg}
					onClick={guitarSamplerClick}/>
				<SoundPicker
					maxW={maxW}
					isLoaded={harpSampler.isLoaded}
					isSelected={instrument === instrumentsObj.harp}
					title={"竖琴"}
					img={harp_ins_svg}
					onClick={harpSamplerClick}/>
				<SoundPicker
					maxW={maxW}
					isLoaded={stringsSampler.isLoaded}
					isSelected={instrument === instrumentsObj.strings}
					title={"弦乐"}
					img={strings_ins_svg}
					onClick={stringSamplerClick}/>
				<SoundPicker
					maxW={maxW}
					img={flute_ins_svg}
					isLoaded={fluteSampler.isLoaded}
					isSelected={instrument === instrumentsObj.flute}
					title={"笛子"}
					onClick={fluteSamplerClick}/>
				<SoundPicker
					maxW={maxW}
					img={fx_ins_svg}
					isLoaded={true}
					onClick={sineSynthClick}
					isSelected={instrument === instrumentsObj.sineSynth}
					title={"正弦泡泡"}
				/>
				<SoundPicker
					maxW={maxW}
					isLoaded={true}
					img={fx_ins_svg}
					isSelected={instrument === instrumentsObj.dingDongSynth}
					onClick={dingDongSynthClick}
					title={"跳一跳"}
				/>

				<SoundPicker
					isLoaded={true}
					maxW={maxW}
					img={fx_ins_svg}
					isSelected={instrument === instrumentsObj.warmSynth}
					title={"温暖丝绒"}
					onClick={warmSynthClick}
				/>
			</div>
			<div style={{color: googleColors.blue800, marginTop: 30, marginBottom: 5}}>和弦播放模式</div>

			<div className="chord_play_style">
				<ChordPlayStyleCard
					type="column"
					isForbidden={forbiddenPlayStyle.column}
					isActive={chordPlayStyle.includes("column")}/>
				<ChordPlayStyleCard
					type="split_up"
					isForbidden={forbiddenPlayStyle.split_up}
					isActive={chordPlayStyle.includes("split_up")}/>
				<ChordPlayStyleCard
					type="split_down"
					isForbidden={forbiddenPlayStyle.split_down}
					isActive={chordPlayStyle.includes("split_down")}/>
			</div>
		</div>
	</>
}

export default SoundConfig

const SoundConfig_css = css({
	...cssFunctions.px(10),
	...cssFunctions.py(15),
	paddingBottom: 10,
	backgroundColor: "white",
	marginTop: 15,
	borderRadius: 8,
	"& .picker_frame": {
		width: "100%",
		...cssPresets.flexCenter,
		flexWrap: "wrap",
		flexGrow: 1,
		gap: 5,
	},
	"& .chord_play_style": {
		...cssPresets.flexCenter,
		gap: 10,
	}
})


