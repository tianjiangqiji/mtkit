/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import React, {useMemo} from "react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useChordConfig from "@/assets/stores/useChordConfig.ts";
import collect from "collect.js";
import music12 from "../../../../../music12";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {isMobile} from "react-device-detect";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";


const ChordWindow = () => {
  const {setIsChordSelectorOpen, chordKey} = useChordConfig()
  const {
    notePickerStep,
    notePickerAlter,
    setNotePickerOpen,
  } = useGlobalSettings()
  const chordWindow = useMemo(() => {
    const findChordObj = collect(music12.chord.chordMeta).where("chordKey", chordKey).first()
    if (findChordObj) return findChordObj.cnName
    return ""
  }, [chordKey])
  return <>
    <div css={ChordDisplay_css(chordWindow.length)}>
      <div className="topbar">
        <div className="picker_note_window" onClick={() => setNotePickerOpen(true)}>
          <NoteText step={notePickerStep} alter={notePickerAlter} fontSize={35}/>
        </div>
        <div className="chord_window" onClick={() => setIsChordSelectorOpen(true)}>
          {chordWindow}和弦
        </div>
      </div>

    </div>
  </>
}

export default ChordWindow

const ChordDisplay_css = (textLength: number) => css({
  "& .topbar": {
    height: 80,
    width: "100%",
    ...cssPresets.flexCenter
  },
  "& .picker_note_window": {
    userSelect: "none",
    width: 80,
    height: 60,
    paddingLeft: 8,
    backgroundColor: "white",
    border: `1px solid ${googleColors.gray300}`,
    borderRadius: 999,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    ...cssPresets.flexCenter,
    cursor: "pointer",
    transition: "all ease-in-out 0.1s",
    "&:hover": isMobile ? {} : {
      backgroundColor: googleColors.gray200,
    }, "&:active": {
      backgroundColor: googleColors.gray300,
    },
  },
  "& .chord_window": {
    width: 250,
    height: 60,
    backgroundColor: "white",
    userSelect: "none",
    border: `1px solid ${googleColors.gray300}`,
    borderLeft: "none",
    borderRadius: 999,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    ...cssPresets.transition,
    ...cssPresets.flexCenter,
    paddingRight: 5,
    fontSize: textLength > 11 ? 16 : textLength >= 9 ? 18 : textLength > 5 ? 22 : 28,
    "&:hover": isMobile ? {} : {
      backgroundColor: googleColors.gray200,
    }, "&:active": {
      backgroundColor: googleColors.gray300,
    },
  }
})
