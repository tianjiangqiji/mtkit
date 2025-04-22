import useSampler from "@/assets/instruments/samplers/useSampler.ts";


const fixedUrls = {
	"C2": `/samples/epiano/C2.mp3`,
	"C3": `/samples/epiano/C3.mp3`,
	"F#4": `/samples/epiano/Fs4.mp3`,
}

const useEPianoSampler = () => useSampler(fixedUrls, {volume: -15})


export default useEPianoSampler;
