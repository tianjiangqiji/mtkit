import useSampler from "@/assets/instruments/samplers/useSampler.ts";

const base = import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/mtkit' : '';
const fixedUrls = {
	"A4": `${base}/samples/strings/A4.mp3`,
	"G4": `${base}/samples/strings/G4.mp3`,
	"A3": `${base}/samples/strings/A3.mp3`,
}

const useStringsSampler = () => useSampler(fixedUrls, {volume: -16})


export default useStringsSampler;
