import useSampler from "@/assets/instruments/samplers/useSampler.ts";


const fixedUrls = {
	"A4": "/samples/guitar-acoustic/A4.mp3",
	"A3": "/samples/guitar-acoustic/A3.mp3",
	"D5": "/samples/guitar-acoustic/D5.mp3",
};

const useGuitarSampler = () => useSampler(fixedUrls, {volume: -10})
export default useGuitarSampler;
