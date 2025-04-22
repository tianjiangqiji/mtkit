import useSampler from "@/assets/instruments/samplers/useSampler.ts";

const base = import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/mtkit' : '';

const fixedUrls = {
	"C2": `${base}/samples/epiano/C2.mp3`,
	"C3": `${base}/samples/epiano/C3.mp3`,
	"F#4": `${base}/samples/epiano/Fs4.mp3`,
}

const useEPianoSampler = () => useSampler(fixedUrls, {volume: -15})


export default useEPianoSampler;
