import useSampler from "@/assets/instruments/samplers/useSampler.ts";

const base = import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/mtkit' : '';


const fixedUrls = {
	"A4": `${base}/samples/flute/A4.mp3`,
	"C5": `${base}/samples/flute/C5.mp3`,
}

const useFluteSampler = () => useSampler(fixedUrls, {volume: -16})


export default useFluteSampler;
