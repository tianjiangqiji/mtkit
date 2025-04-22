import useSampler from "@/assets/instruments/samplers/useSampler.ts";



const fixedUrls = {
	"A4": `/samples/flute/A4.mp3`,
	"C5": `/samples/flute/C5.mp3`,
}

const useFluteSampler = () => useSampler(fixedUrls, {volume: -16})


export default useFluteSampler;
