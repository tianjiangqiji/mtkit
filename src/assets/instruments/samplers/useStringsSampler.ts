import useSampler from "@/assets/instruments/samplers/useSampler.ts";

const fixedUrls = {
	"A4": "/samples/strings/A4.mp3",
	"G4": "/samples/strings/G4.mp3",
	"A3": "/samples/strings/A3.mp3",
}

const useStringsSampler = () => useSampler(fixedUrls, {volume: -16})


export default useStringsSampler;
