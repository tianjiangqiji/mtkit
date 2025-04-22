// noinspection ES6PreferShortImport
import instrumentsObj from "@/apps/Settings/datas/instrumentsObj.ts";
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
import {useMemo} from "react";

const useInstrument = () => {
	const {instrument} = useGlobalSettings()
	const guitarSampler = useGuitarSampler()
	const pianoSampler = usePianoSampler()
	const ePianoSampler = useEPianoSampler()
	const stringsSampler = useStringsSampler()
	const fluteSampler = useFluteSampler()
	const harpSampler = useHarpSampler()
	const warmSynth = useWarmSynth()
	const sineSynth = useSineSynth()
	const dingDongSynth = useDingDongSynth()
	const currentInstrument = useMemo(() => {
		switch (instrument) {
			case instrumentsObj.piano:
				return pianoSampler
			case instrumentsObj.ePiano:
				return ePianoSampler
			case instrumentsObj.guitar:
				return guitarSampler
			case instrumentsObj.harp:
				return harpSampler
			case instrumentsObj.strings:
				return stringsSampler
			case instrumentsObj.flute:
				return fluteSampler
			case instrumentsObj.sineSynth:
				return sineSynth
			case instrumentsObj.dingDongSynth:
				return dingDongSynth
			case instrumentsObj.warmSynth:
				return warmSynth
			default:
				return dingDongSynth
		}
	}, [instrument, dingDongSynth, ePianoSampler, fluteSampler, guitarSampler, harpSampler, pianoSampler, sineSynth, stringsSampler, warmSynth])
	return {
		player: currentInstrument.player,
		isLoaded: currentInstrument.isLoaded,
	}
}

export default useInstrument
