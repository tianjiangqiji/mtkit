/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import React, {useState} from "react";
import byDefault from "@/utils/byDefault.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import NoteSymbol from "@/components/reNote/NoteSymbol/NoteSymbol.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import getAlterText from "../utils/getAlterText.ts";
import {MdReadMore} from "react-icons/md";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {isMobile} from "react-device-detect";
import ClefWindow from "@/components/reStave/ClefWindow/ClefWindow.tsx";

const scaleTitleFontSize = 25
const scaleTitleColor = googleColors.blue800
const tonicReplacedColor = googleColors.gray600
const ReverseNoteStave = (props: {
  isTonicNoteReplaced: boolean;
  tonicStep: string
  tonicAlter: number
  staveAlters: number
  rawStaveAlters: number
  rawTonicStep?: string
  rawTonicAlter?: number
  clef?: string
  isMajor?: boolean
}) => {
  const isTonicNoteReplaced = byDefault(props.isTonicNoteReplaced, false)
  const [clef, setClef] = useState(byDefault(props.clef, "G"))
  const changeClef = () => {
    if (clef === "treble") return setClef("alto")
    if (clef === "alto") return setClef("bass")
    if (clef === "bass") return setClef("treble")
  }
  const ifReplacedText = () => {
    const modeText = props.isMajor ? "大调" : "小调"
    if (props.rawStaveAlters === 0) return `${modeText}替换`
    if (props.rawStaveAlters > 0) return `${modeText}升号${props.rawStaveAlters}个·已替换`
    return `${modeText}降号${Math.abs(props.rawStaveAlters)}个·已替换`
  }

  const keySig = 0
  return <>
    <div css={ReverseNoteStave_css}>
      <div className="scale">
        <div className="tonic_replaced">
          {isTonicNoteReplaced &&
              <NoteText step={props.rawTonicStep} alter={props.rawTonicAlter} color={tonicReplacedColor}/>}
          <div style={{
            marginLeft: 5,
            fontSize: 15,
            color: tonicReplacedColor
          }}>{isTonicNoteReplaced ? ifReplacedText() : void 0}</div>
        </div>
        <div className="up_part">
          <NoteText step={props.tonicStep}
                    alter={props.tonicAlter}
                    color={scaleTitleColor}
                    fontSize={scaleTitleFontSize}/>
          <span>{props.isMajor ? "大调" : "小调"}</span>
          {props.staveAlters !== 0 && <div className="alter_number">
              <div>
                  <NoteSymbol alter={props.staveAlters > 0 ? 1 : -1} color={googleColors.blue800}/>
              </div>
              <div>×{Math.abs(props.staveAlters)}</div>
          </div>}
          {props.staveAlters === 0 && <div className="alter_number">
              <div>
                  <NoteSymbol alter={0} color={googleColors.blue800}/>
              </div>
          </div>}
        </div>

        <div className="stave_frame" onClick={changeClef}>
          <ClefWindow clef={clef}
                      keySignature={keySig}/>
        </div>
        <div className="details">
          <span>详细</span>
          <MdReadMore color={googleColors.blue800} size={28}/>
        </div>
      </div>
    </div>
  </>
}

export default ReverseNoteStave

const ReverseNoteStave_css = css({
  "& .scale": {
    ...cssPresets.flexCenter,
    flexDirection: "column",
    "& .tonic_replaced": {
      fontFamily: "misans-m",
      fontSize: 15,
      color: tonicReplacedColor,
      ...cssPresets.flexCenter,
      marginBottom: 3
    },
    "& .replaced_notes_list": {
      ...cssPresets.flexCenter,
      userSelect: "none",
      fontFamily: "misans-m",
      gap: 15,
    },
    "& .stave_frame": {
      width: "100%",
      marginTop: 5,
      ...cssPresets.flexCenter,
      "& svg": {
        height: "100%",
        width: "fit-content",
      }
    },
    "& .details": {
      fontFamily: "misans-m",
      userSelect: "none",
      fontSize: 20,
      color: googleColors.blue800,
      ...cssPresets.flexCenter,
      height: 40,
      ...cssPresets.transition,
      backgroundColor: "white",
      marginTop: 10,
      width: 200,
      borderRadius: 999,
      cursor: "pointer",
      border: `1px solid ${googleColors.gray300}`,
      "&>span": {
        marginRight: 5,
      },
      "&:hover": {
        backgroundColor: isMobile ? "" : googleColors.gray200,
      }, "&:active": {
        backgroundColor: googleColors.gray300
      },
    },
    "& .up_part": {
      ...cssPresets.flexCenter,
      marginBottom: 5,
      "&>span": {
        fontFamily: "misans-m",
        marginLeft: 5,
        fontSize: scaleTitleFontSize,
        color: scaleTitleColor,
      },
    },
    "& .alter_number": {
      height: 20,
      width: 80,
      ...cssPresets.flexCenter,
      marginLeft: 10,
      "&>div:last-of-type": {
        minWidth: 30,
        fontSize: 25,
        color: googleColors.blue800,
        fontFamily: "misans-m",
      },
      "&>div:first-of-type": {
        height: 25,
        width: 20,
        marginLeft: 5,
        ...cssPresets.flexCenter,
        "& svg": {
          height: "100%",
          width: "auto",
        }
      },
    },
  }
})
