/* eslint-disable no-mixed-spaces-and-tabs */
import {useMemo} from "react";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import music12 from "@/music12";
import {isEmpty, range} from "lodash";
import {css} from "@emotion/react";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";

const keyFontSize = 18
const useFindChord = () => {
  const {
    pianoKeyList,
    isNoteStrictIn,
    detailChordKeyAndLocation,
    detailModeKeyAndLocation
  } = useFindChordConfig()
  const findResult = useMemo(() => {
    if (pianoKeyList.length ===0 ) return []
    return music12.chord.findChord(pianoKeyList, isNoteStrictIn)
  }, [isNoteStrictIn, pianoKeyList])

  const findInScaleResult = useMemo(() => {
    if (pianoKeyList.length === 0) return []
    return music12.chord.findChordInScale(pianoKeyList)
  }, [pianoKeyList])


  const keyNoteList = useMemo(() => {
    const emptyList = Array.from({length: 12}, () => void 0)
    if (isEmpty(detailChordKeyAndLocation)) return emptyList
    const rootNote = music12.note.getNoteByLocation(detailChordKeyAndLocation[0])[0]
    const chordInstance = music12.factory.getChord(rootNote.step, rootNote.alter, rootNote.octave, detailChordKeyAndLocation[1])
    emptyList[rootNote.locationId] = <div css={node_css}>根</div>
    chordInstance.notesList.map((x, y) => {
      if (y === 0) return;
      const itvList = chordInstance.intervalList[y - 1]
      const tn = chordInstance.notesList[y]
      if ([5, 8, 12, 4, 11].includes(itvList[1])) {
        if (itvList[0] === "p") emptyList[tn.locationId] = <div css={node_css}>{itvList[1]}</div>
        else if (itvList[0] === "dim") emptyList[tn.locationId] = <div css={node_css}>
          <NumberNote num={itvList[1]} alter={-1} fontSize={keyFontSize} color={"white"}/>
        </div>
        else if (itvList[0] === "aug") emptyList[tn.locationId] = <div css={node_css}>
          <NumberNote num={itvList[1]} alter={1} fontSize={keyFontSize} color={"white"}/>
        </div>
      } else if ([2, 3, 6, 7, 9, 10, 13].includes(itvList[1])) {
        if (itvList[0] === "maj") emptyList[tn.locationId] = <div css={node_css}>{itvList[1]}</div>
        else if (itvList[0] === "dim") emptyList[tn.locationId] = <div css={node_css}>
          <NumberNote num={itvList[1]} alter={-2} fontSize={keyFontSize} color={"white"}/>
        </div>
        else if (itvList[0] === "min") emptyList[tn.locationId] = <div css={node_css}>
          <NumberNote num={itvList[1]} alter={-1} fontSize={keyFontSize} color={"white"}/>
        </div>
        else if (itvList[0] === "aug") emptyList[tn.locationId] = <div css={node_css}>
          <NumberNote num={itvList[1]} alter={1} fontSize={keyFontSize} color={"white"}/>
        </div>
      }
    })
    return emptyList
  }, [detailChordKeyAndLocation])
  const scaleKeyNoteList = useMemo(() => {
    const emptyList = Array.from({length: 12}, () => void 0)
    if (isEmpty(detailModeKeyAndLocation)) return emptyList
    const rootNote = music12.note.getNoteByLocation(detailModeKeyAndLocation[0])[0]
    const scaleInstance = new music12.scale.Scale(rootNote, detailModeKeyAndLocation[1])
    scaleInstance.notesList.map((n, i) => {
      if (i === 0) emptyList[n.locationId] = <div css={node_css}>根</div>
      else {
        emptyList[n.locationId] = <div css={node_css}>
          <NumberNote num={i + 1} alter={scaleInstance.alterList[i]} fontSize={keyFontSize} color={"white"}/>
        </div>
      }
    })
    return emptyList
  }, [detailModeKeyAndLocation])

  return {findResult, keyNoteList, findInScaleResult, scaleKeyNoteList}
}

export default useFindChord

const node_css = css({
  background: googleColors.red300,
  borderRadius: 999,
  width: 35,
  height: 35,
  color: "white",
  marginBottom: 0,
  fontSize: keyFontSize,
  ...cssPresets.flexCenter
})

