/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import useChord from "@/apps/ChordDisplay/useChord.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import music12 from "music12";
import googleColors from "@/assets/colors/googleColors.ts";
import {useWindowSize} from "react-use";


const ChordNotesInterval = () => {
  const {chord} = useChord()
  const {width} = useWindowSize()
  const givenItv = (i: number) => {
    const itv = music12.interval.getIntervalByComparingNotes(chord.rootNote, chord.notesList[i])
    const itvDes = itv.cnPrefix
    const degree = itv.num
    return `${itvDes}${degree}`
  }
  return <>
    <div css={ChordNotesInterval_css(width)}>
      {chord.notesList.map((x, y) => <div
        className="each_note" key={x.locationId}>
        <div className="note_window">
          <NoteText step={x.step} alter={x.alter} fontSize={25}/>
        </div>
        <div className="itv_des">
          {y === 0 ? "根音" : givenItv(y)}
        </div>
      </div>)}
    </div>
  </>
}

export default ChordNotesInterval

const ChordNotesInterval_css = (w: number) => css({
  ...cssPresets.flexCenter,
  height: 65,
  "& .each_note": {
    backgroundColor: "white",
    width: w <= 400 ? 50 : 65,
    height: "100%",
    ...cssPresets.flexCenter,
    flexDirection: "column"
  },
  "& .each_note:not(:first-of-type)": {
    borderLeft: `1px solid ${googleColors.gray200}`
  },
  "& .each_note:first-of-type": {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  }, "& .each_note:last-of-type": {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  "& .itv_des": {
    color: googleColors.blue800,
    marginTop: 3,
  }
})
