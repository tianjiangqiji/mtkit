/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import StaveWithChord from "@/components/reStave/StaveWindow/StaveWithChord.tsx";
import useChord from "@/apps/ChordDisplay/useChord.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import useScoreCheckerConfig from "@/assets/stores/useScoreCheckerConfig.ts";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";


const ChordStave = () => {
  const {chord, chordVoicing, shiftStaveOctave} = useChord()
  const {setIsChordStaveConfigOpen, setIsChordOctaveShiftOpen} = useChordConfig()
  const {clef, setClef, changeClef} = useScoreHelperConfig()
  const {keys, setKeys} = useScoreCheckerConfig()
  return <>
    <div css={ChordStave_css(chord.notesList.length)}>
      <div onClick={() => setIsChordStaveConfigOpen(true)}>
        <StaveWithChord w={300} clef={clef} keys={keys}  notesList={chordVoicing}/>
      </div>
      <div className="octave">
        <div className="octave_option" onClick={() => shiftStaveOctave(1)}>八度上移</div>
        <div className="octave_option" onClick={() => shiftStaveOctave(-1)}>八度下移</div>
        {chord.notesList.length <= 4 && <div
            className="octave_option" onClick={() => setIsChordOctaveShiftOpen(true)}>更多移动</div>}
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
