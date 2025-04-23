/* eslint-disable no-mixed-spaces-and-tabs */
import useChord from "@/apps/ChordDisplay/useChord.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useInstrument from "@/assets/instruments/useInstrument.ts";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useScoreCheckerConfig from "@/assets/stores/useScoreCheckerConfig.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import StaveWithChord from "@/components/reStave/StaveWindow/StaveWithChord.tsx";
import * as music12 from "@/music12";
import {css} from "@emotion/react";
import {Toaster} from "react-hot-toast";
import {AiFillSound} from "react-icons/ai";

const ChordStave = () => {
	const {chord, chordVoicing} = useChord()
	const {setIsChordStaveConfigOpen, setIsChordOctaveShiftOpen} = useChordConfig()
	const {clef, setClef, changeClef} = useScoreHelperConfig()
	const {keys, setKeys} = useScoreCheckerConfig()
	const {chordPlayStyle} = useGlobalSettings()
	const {isLoaded, player, play} = useInstrument()
	const playChord = () => {
		const playList = chordVoicing.map(note => {
			return music12.factory.getNote(note.step, note.alter, note.octave).pitchValue
		})
		play(playList, {column: "2n", split_up: "4n", split_down: "4n"}, 10)
	}
	return <>
		<Toaster/>
		<div css={ChordStave_css(chord.notesList.length)}>
			<div onClick={() => setIsChordStaveConfigOpen(true)}>
				<StaveWithChord w={300} clef={clef} keys={keys}/>
			</div>
			<div className="octave">
				<div className="octave_option" onClick={() => setIsChordOctaveShiftOpen(true)}>
					八度移动
				</div>
				<div className="octave_option" onClick={playChord}>
					<AiFillSound size={20} style={{marginRight: 5}}/>
				</div>
			</div>
		</div>
	</>
}

export default ChordStave

const ChordStave_css = (noteListLength: number) => css({
	cursor: "pointer",
	userSelect: "none",
	"& .octave": {
		width: "100%",
		...cssPresets.flexCenter,
		padding: 15,
		"& .octave_option:not(:first-of-type)": {
			borderLeft: `1px solid ${googleColors.gray300}`,
		},
		"& .octave_option:first-of-type": {

			borderTopLeftRadius: 999,
			borderBottomLeftRadius: 999,
			...cssPresets.defaultHoverAndActive as any
		}, "& .octave_option:last-of-type": {
			borderTopRightRadius: 999,
			borderBottomRightRadius: 999,
			...cssPresets.defaultHoverAndActive as any
		},
		"& .octave_option": {
			width: noteListLength <= 4 ? "33%" : "50%",
			maxWidth: 110,
			...cssPresets.flexCenter,
			backgroundColor: "white",
			height: 50,
			color: googleColors.blue800
		}
	}
})
