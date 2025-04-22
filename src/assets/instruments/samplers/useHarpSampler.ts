import useSampler from "@/assets/instruments/samplers/useSampler.ts";

const fixedUrls = {
	"F4": "/samples/harp/F4.mp3",
	"B5": "/samples/harp/B5.mp3",
	"D6": "/samples/harp/D6.mp3",
}

const useHarpSampler = () => useSampler(fixedUrls, {volume: -10, release: 0.01})


export default useHarpSampler;
