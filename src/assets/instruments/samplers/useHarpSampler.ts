import useSampler from "@/assets/instruments/samplers/useSampler.ts";
const base = import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/mtkit' : '';

const fixedUrls = {
	"F4": `${base}/samples/harp/F4.mp3`,
	"B5": `${base}/samples/harp/B5.mp3`,
	"D6": `${base}/samples/harp/D6.mp3`,
}

const useHarpSampler = () => useSampler(fixedUrls, {volume: -10, release: 0.01})


export default useHarpSampler;
