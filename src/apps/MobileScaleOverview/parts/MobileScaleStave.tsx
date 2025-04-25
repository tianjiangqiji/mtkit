/* eslint-disable no-mixed-spaces-and-tabs */
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import shadowPresets from "@/assets/styles/shadowPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import NumberNote from "@/components/reNote/NumberNote/NumberNote.tsx";
import RoughStaveClefAndScale from "@/components/reStave/StaveWindow/RoughStaveClefAndScale.tsx";
import {css} from "@emotion/react";
import {useWindowSize} from "react-use";

const pianoFontSize = 22
const pianoFontColor = googleColors.blue800
const MobileScaleStave = () => {
  const {width, height} = useWindowSize();
  const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  const {clef, changeClef} = useScoreHelperConfig()
  const {setIsMobileStaveConfigWindowOpen, pianoNodeDisplayBy} = useScaleConfig()
  const {scaleInstance, keys,notesList} = useScaleInstance()
  const notesList1 = notesList.slice(0, 3).map(x => ({step: x.step, alter: x.alter}))
  const notesList2 = notesList.slice(3).map(x => ({step: x.step, alter: x.alter}))
  return <>
    <div css={MobileScaleStave_css(Math.abs(keys))}>
      <RoughStaveClefAndScale
        onClick={() => setIsMobileStaveConfigWindowOpen(true)}
        clef={clef}
        keys={keys} w={width - 25}
        h={150}
        notesList={notesList1}/>
      <div className="note_frame">
        {notesList1.map((x, i) => {
          return pianoNodeDisplayBy === "note" ?
            <NoteText key={i} step={x.step} alter={x.alter} fontSize={pianoFontSize} color={pianoFontColor}/> :
            <NumberNote key={i} alter={scaleInstance.alterList[i]} isRomeStyle={pianoNodeDisplayBy === "rome"}
                        num={i + 1}
                        color={pianoFontColor} fontSize={pianoFontSize}/>
        })}
      </div>
      <RoughStaveClefAndScale
        onClick={() => setIsMobileStaveConfigWindowOpen(true)}
        keys={keys} w={width - 25}
        clef={clef}
        h={150}
        notesList={notesList2}/>
      <div className="note_frame">
        <div className="note_frame">
          {notesList2.map((x, i) => {
            return pianoNodeDisplayBy === "note" ?
              <NoteText key={i} step={x.step} alter={x.alter} fontSize={pianoFontSize} color={pianoFontColor}/> :
              <NumberNote
                key={i}
                alter={scaleInstance.alterList[i + notesList1.length]}
                isRomeStyle={pianoNodeDisplayBy === "rome"} num={i + 1 + notesList1.length}
                color={pianoFontColor} fontSize={pianoFontSize}/>
          })}
        </div>
      </div>

      {scaleInstance.isTonicReplaced && <div
          onClick={() => {
            const en = scaleInstance.equalRootNote
            setNotePickerStep(en.step)
            setNotePickerAlter(en.alter)
          }}
          className="is_tonic_replaced">
          <div className="text">该音阶存在等音替换</div>
      </div>}
    </div>
  </>
}

export default MobileScaleStave

const MobileScaleStave_css = (keys: number) => css({
  width: "100%",
  height: "100%",
  marginTop: 5,
  "& .note_frame": {
    height: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  "& .is_tonic_replaced": {
    width: "calc(80vw)",
    maxWidth: 320,
    backgroundColor: googleColors.amber200,
    marginLeft: "auto",
    marginRight: "auto",
    height: 60,
    borderRadius: 999,
    marginTop: 5,
    ...cssPresets.flexCenter,
    userSelect: "none",
    boxShadow: shadowPresets.blur1,
    ...cssPresets.transition,
    "&:active": {
      backgroundColor: googleColors.amber300
    },
    "& .text": {
      color: googleColors.deepOrange800
    }
  }
})
