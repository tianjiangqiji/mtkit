import useSampler from "@/assets/instruments/samplers/useSampler.ts";

const base = import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/mtkit' : '';

const fixedUrls = {
	"C4": `${base}/samples/piano/C4.mp3`,
	"A4": `${base}/samples/piano/A4.mp3`,
	"A5": `${base}/samples/piano/A5.mp3`,
	"F#3": `${base}/samples/piano/Fs3.mp3`,
	// 可以根据需要添加更多音符的样本
}

const usePianoSampler = () => useSampler(fixedUrls, {volume: -5})

export default usePianoSampler;
