/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useMemo, useRef, useState} from "react";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import AlterStaveWindow from "@/apps/MobileKSQuery/comps/AlterStaveWindow.tsx";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import * as music12 from "@/music12";
import {MdReadMore} from "react-icons/md";
import {isMobile} from "react-device-detect";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import ClefWindow from "@/components/reStave/ClefWindow/ClefWindow.tsx";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";

const alterColor = googleColors.blue800
const scaleTonicFontSize = 35
const QueryScalesByAlter = () => {
  const {staveAlters, setStaveAlters, isStaveSharp, clef, setClef, setIsStaveQueryReverse} = useScoreHelperConfig()
  const {mode, setMode,} = useScaleConfig()
  const {notePickerStep, notePickerAlter, setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  const navigate = useNavigate()
  const naviToScaleInfo = (step: string, alter: number, mode: string) => {
    setNotePickerStep(step);
    setNotePickerAlter(alter)
    setMode(mode)
    setIsStaveQueryReverse(false)
    navigate(`/${routerPath.tablet_scaleQuery}`, {replace: true})
  }
  const scales = useMemo(() => {
    return music12.stave.getScaleByStaveAlters(isStaveSharp ? staveAlters : staveAlters * -1)
  }, [isStaveSharp, staveAlters])
  const alteredNotes = useMemo(() => {
    return music12.stave.getAlterStepListByNum(isStaveSharp ? staveAlters : -1 * staveAlters)
  }, [isStaveSharp, staveAlters])
  const alteredNotesFontSize = () => {
    if (alteredNotes.length < 5) return 25
    return 20
  }
  const alteredNotesGap = () => {
    if (alteredNotes.length <= 4) return 25
    if (alteredNotes.length === 5) return 20
    if (alteredNotes.length === 6) return 16
    if (alteredNotes.length === 7) return 14
  }
  const changeClef = () => {
    switch (clef) {
      case "F":
        return setClef("G")
      case "G":
        return setClef("M")
      case "M":
        return setClef("F")
      default:
        return setClef("G")
    }
  }
  return <>
    <div css={ScaleStave_css}>
      <div className="description">
        {staveAlters === 0 && "无升/降号"}
        {staveAlters !== 0 && `${Math.abs(staveAlters)}个${isStaveSharp ? "升" : "降"}号`}
        <div className="alters">
          {(staveAlters !== 0 && isStaveSharp) && <NoteSymbol alter={1} color={alterColor}/>}
          {(staveAlters !== 0 && !isStaveSharp) && <NoteSymbol alter={-1} color={alterColor}/>}
          {(staveAlters === 0) && <NoteSymbol alter={0} color={alterColor}/>}
        </div>
      </div>

      <div className="clef_window" onClick={changeClef}>
        <ClefWindow keySignature={staveAlters} clef={clef}/>
      </div>
      {/*变化的音符*/}
      <div className="altered_notes_frame" style={{
        ...cssPresets.flexCenter, width: 250, flexWrap: "wrap",
        gap: alteredNotesGap()
      }}>
        {alteredNotes.length > 0 && alteredNotes.map((x, i) => {
          return <div className="each" key={i}>
            <NoteText step={x} alter={isStaveSharp ? 1 : -1} fontSize={alteredNotesFontSize()}
                      color={googleColors.gray600}/>
          </div>
        })}
        {alteredNotes.length === 0 && <div style={{ color: googleColors.gray600}}>无升降</div>}
      </div>
      {/*大调卡片*/}
      <div className="scale_card">
        <div className="scale_info">
          <div className="n">
            <NoteText step={scales[0].rawNoteStep} alter={scales[0].rawNoteAlter} fontSize={scaleTonicFontSize}/>
          </div>
          <div className="scale_description">
            自然大调 Ionian
          </div>
        </div>
        <div className="details" onClick={() => naviToScaleInfo(scales[0].rawNoteStep, scales[0].rawNoteAlter, "MAJ")}>
          <span>详细</span>
          <MdReadMore color={googleColors.blue800} size={28}/>
        </div>
      </div>
      {/*小调卡片*/}
      <div className="scale_card">
        <div className="scale_info">
          <div className="n">
            <NoteText step={scales[1].rawNoteStep} alter={scales[1].rawNoteAlter} fontSize={scaleTonicFontSize}/>
          </div>
          <div className="scale_description">
            自然小调 Aeolian
          </div>
        </div>
        <div className="details" onClick={() => naviToScaleInfo(scales[1].rawNoteStep, scales[1].rawNoteAlter, "MIN")}>
          <span>详细</span>
          <MdReadMore color={googleColors.blue800} size={28}/>
        </div>
      </div>
    </div>
  </>
}

export default QueryScalesByAlter

const ScaleStave_css = css({
  "& .description": {
    
    fontSize: 30,
    height: 40, marginBottom: 8,
    color: googleColors.blue800,
    textAlign: "center",
    ...cssPresets.flexCenter,
    "& .alters": {
      height: 25,
      width: 20,
      marginLeft: 15
    }
  },
  "& .altered_notes_frame": {
    
    marginLeft: "auto",
    marginRight: "auto",
    // ...cssPresets.flexCenter,
    marginBottom: 10,
    marginTop: 10,
    // gap: 20,
  },
  "& .scale_card": {
    width: "100%",
    maxWidth: 450,
    marginLeft: "auto",
    marginRight: "auto",
    height: 100,
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 15,
    paddingBottom: 15,
    paddingTop: 15,
    ...cssPresets.flexCenter,
    "& .details": {
      ...cssPresets.flexCenter,
      userSelect: "none",
      
      borderRadius: 8,
      flexDirection: "column",
      paddingTop: 10,
      width: 100,
      height: 70,
      marginLeft: 20,
      border: `1px solid ${googleColors.blue600}`,
      cursor: "pointer",
      ...cssPresets.transition,
      "& span": {
        color: googleColors.blue800
      },
      "&:hover": {
        backgroundColor: isMobile ? void 0 : googleColors.blue50
      },
      "&:active": {
        backgroundColor: googleColors.gray200,
        borderColor: googleColors.gray400
      }
    },
    "& .scale_info": {
      // backgroundColor: "red",
      ...cssPresets.flexCenter,
      "& .n": {
        width: 45,
      },
      "& .scale_description": {
        
        width: 170,
        textAlign: "center",
        fontSize: 20,
        color: googleColors.gray800,
      }
    },

  }
})
