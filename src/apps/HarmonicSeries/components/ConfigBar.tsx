/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import {BiPlus} from "react-icons/bi";
import {MdClear} from "react-icons/md";
import useHarmonicSeriesConfig from "@/assets/stores/useHarmonicSeriesConfig.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";


const ConfigBar = () => {
  const {clearNotesList, addNotesList} = useHarmonicSeriesConfig()
  const {notePickerStep, notePickerAlter, setNotePickerOpen} = useGlobalSettings()
  return <>
    <div css={ConfigBar_css}>
      <div className="option" onClick={clearNotesList}>
        <MdClear/>
        <div style={{marginLeft: 5}}> 清空</div>
      </div>
      {/*<div className="note_window" onClick={() => setNotePickerOpen(true)}>*/}
      {/*  <NoteText step={notePickerStep} fontSize={35} alter={notePickerAlter}/>*/}
      {/*</div>*/}
      <div className="option" onClick={() => setNotePickerOpen(true)}>
        <BiPlus/>
        <div style={{marginLeft: 5}}> 添加</div>
      </div>
    </div>
  </>
}

export default ConfigBar

const ConfigBar_css = css({
  width: "100%",
  userSelect: "none",
  height: 80,
  ...cssPresets.flexCenter,
  gap: 10,
  "& .note_window": {
    width: 120,
    height: 55,
    ...cssPresets.flexCenter,
    backgroundColor: "white",
    borderRadius: 999,
    ...cssPresets.defaultHoverAndActive as any
  },
  "& .option  ": {
    width: 120,
    height: 40,
    backgroundColor: "white",
    ...cssPresets.flexCenter,
    borderRadius: 999,
    color: GoogleColors.blue800,
    ...cssPresets.defaultHoverAndActive as any
  }
})
