import useSampler from "@/assets/instruments/samplers/useSampler.ts";
const base = import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/mtkit' : '';


const fixedUrls = {
	"A4": `${base}/samples/guitar-acoustic/A4.mp3`,
	"A3": `${base}/samples/guitar-acoustic/A3.mp3`,
	"D5": `${base}/samples/guitar-acoustic/D5.mp3`,
};

const useGuitarSampler = () => useSampler(fixedUrls, {volume: -10})
export default useGuitarSampler;
