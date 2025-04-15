/* eslint-disable no-mixed-spaces-and-tabs */

import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import {css} from "@emotion/react";
import {clamp, isUndefined} from "lodash";
import * as music12 from "@/music12";
import {useEffect, useMemo, useState} from "react";
import {isMobile} from "react-device-detect";
import {useWindowSize} from "react-use";
import BlankNoteText from "@/components/reNote/NoteText/BlankNoteText.tsx";

const blankNoteColor = googleColors.gray400
const defaultNoteColor = googleColors.gray800
const intervalList = [["dim", 2], ["min", 2], ["maj", 2], ["aug", 2], ["dim", 3], ["min", 3], ["maj", 3], ["aug", 3],
  ["dim", 4], ["p", 4], ["aug", 4], ["dim", 5], ["p", 5], ["aug", 5], ["dim", 6], ["min", 6], ["maj", 6], ["aug", 6],
  ["dim", 7], ["min", 7], ["maj", 7], ["aug", 7]]

const PhoneNotesPanel = (props: {
  isUpward: boolean;
  isAugDimShow: boolean;
  frameWidth: number;
}) => {
  const noteSize = 28
  const [noteWindowWidth, setNoteWindowWidth] = useState(props.isAugDimShow ?
    clamp(props.frameWidth / 4.6, 80, 100) :
    clamp(props.frameWidth / 4.5, 80, 100))
  const {notePickerStep, notePickerAlter, setNotePicker} = useGlobalSettings()
  const windowSize = useWindowSize();
  const getNoteSeries = useMemo(() => {
    const r = new music12.note.Note(notePickerStep as any, notePickerAlter as any, 4)
    const result = {}
    intervalList.map(x => {
      try {
        const targetNote = r.getNoteByInterval(new music12.interval.Interval(x[0] as any, x[1] as number), props.isUpward)
        result[`${x[0]}${x[1]}`] = {step: targetNote.step, alter: targetNote.alter}
      } catch (e) {
        result[`${x[0]}${x[1]}`] = void 0
      }
    })
    return result
  }, [props.isUpward, notePickerAlter, notePickerStep])
  const [noteSeries, setNoteSeries] = useState(getNoteSeries)
  useEffect(() => {
    setNoteSeries(getNoteSeries)
  }, [notePickerStep, notePickerAlter, props.isUpward, getNoteSeries])

  const selectNewNote = (k: string) => {
    if (isUndefined(noteSeries[k])) return
    if (Math.abs(noteSeries[k].alter) <= 1) {
      setNotePicker(noteSeries[k].step, noteSeries[k].alter)
    }
  }
  useEffect(() => {
    if (windowSize.width === props.frameWidth) {
      if (props.isAugDimShow) {
        setNoteWindowWidth(clamp(props.frameWidth / 4.6, 80, 100))
      } else {
        setNoteWindowWidth(125)
      }
    } else {
      if (props.isAugDimShow) {
        setNoteWindowWidth(clamp(props.frameWidth / 4.6, 80, 100))
      } else {
        setNoteWindowWidth(clamp((windowSize.width / 2 - 10) / 3, 90, 125))
      }
    }

  }, [props.frameWidth, props.isAugDimShow, windowSize.width])

  const verifyNote = (k: string) => {
    if (isUndefined(noteSeries[k])) return false
    return Math.abs(noteSeries[k].alter) <= 1
  }

  return <div css={phone_notes2interval_css}>
    <div className="interval_title">
      <span>以</span>
      <NoteText step={notePickerStep} alter={notePickerAlter} fontSize={14}/>
      <span>
				为{props.isUpward ? "起点·上行" : "终点·下行"}·从音程得音符
			</span>
    </div>
    {/*================================ 2度 ===============================================*/}
    <div className="line">
      <div className="interval_num">2</div>
      {/*======================================= 减2度 =============================================*/}
      {<div className="cell"
            onClick={() => selectNewNote("dim2")}
            css={select_note_css(verifyNote("dim2"), noteWindowWidth, props.isAugDimShow)}
      >
        <div className="description">
          <div className="interval_text">减二度</div>
          <div className="interval_semitone">0</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["dim2"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["dim2"].step}
                      color={defaultNoteColor}
                      alter={noteSeries["dim2"].alter} fontSize={noteSize}/>}
        </div>
      </div>}
      {/*======================================= 小2度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("min2")}
           css={select_note_css(verifyNote("min2"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">小二度</div>
          <div className="interval_semitone">1</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["min2"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["min2"].step}
                      color={defaultNoteColor}
                      alter={noteSeries["min2"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 大2度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("maj2")}
           css={select_note_css(verifyNote("maj2"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">大二度</div>
          <div className="interval_semitone">2</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["maj2"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["maj2"].step}
                      color={defaultNoteColor}
                      alter={noteSeries["maj2"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 增2度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("aug2")}
           css={select_note_css(verifyNote("aug2"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">增二度</div>
          <div className="interval_semitone">3</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["aug2"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["aug2"].step}
                      color={defaultNoteColor}
                      alter={noteSeries["aug2"].alter} fontSize={noteSize}/>}
        </div>
      </div>

    </div>
    {/*================================ 3度 ===============================================*/}
    <div className="line">
      <div className="interval_num">3</div>
      {/*======================================= 减3度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("dim3")}
           css={select_note_css(verifyNote("dim3"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">减三度</div>
          <div className="interval_semitone">2</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["dim3"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["dim3"].step}
                      color={defaultNoteColor}
                      alter={noteSeries["dim3"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 小3度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("min3")}
           css={select_note_css(verifyNote("min3"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">小三度</div>
          <div className="interval_semitone">3</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["min3"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["min3"].step} color={defaultNoteColor}
                      alter={noteSeries["min3"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 大3度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("maj3")}
           css={select_note_css(verifyNote("maj3"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">大三度</div>
          <div className="interval_semitone">4</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["maj3"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["maj3"].step} color={defaultNoteColor}
                      alter={noteSeries["maj3"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 增3度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("aug3")}
           css={select_note_css(verifyNote("aug3"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">增三度</div>
          <div className="interval_semitone">5</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["aug3"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["aug3"].step} color={defaultNoteColor}
                      alter={noteSeries["aug3"].alter} fontSize={noteSize}/>}
        </div>
      </div>
    </div>
    {/*================================ 4度 ===============================================*/}
    <div className="line">
      <div className="interval_num">4</div>
      {/*======================================= 减4度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("dim4")}
           css={select_note_css(verifyNote("dim4"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">减四度</div>
          <div className="interval_semitone">4</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["dim4"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["dim4"].step} color={defaultNoteColor}
                      alter={noteSeries["dim4"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 纯4度 =============================================*/}
      <div className={props.isAugDimShow ? "cell double_length_cell" : "cell"}
           onClick={() => selectNewNote("p4")}
           css={select_note_css(verifyNote("p4"), noteWindowWidth, true, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">纯四度</div>
          <div className="interval_semitone">5</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["p4"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["p4"].step} color={defaultNoteColor}
                      alter={noteSeries["p4"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 增4度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("aug4")}
           css={select_note_css(verifyNote("aug4"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">增四度</div>
          <div className="interval_semitone">6</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["aug4"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["aug4"].step} color={defaultNoteColor}
                      alter={noteSeries["aug4"].alter} fontSize={noteSize}/>}
        </div>
      </div>
    </div>
    {/*================================ 5度 ===============================================*/}
    <div className="line">
      <div className="interval_num">5</div>
      {/*======================================= 减5度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("dim5")}
           css={select_note_css(verifyNote("dim5"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">减五度</div>
          <div className="interval_semitone">6</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["dim5"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["dim5"].step} color={defaultNoteColor}
                      alter={noteSeries["dim5"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 纯5度 =============================================*/}
      <div className={props.isAugDimShow ? "cell double_length_cell" : "cell"}
           onClick={() => selectNewNote("p5")}
           css={select_note_css(verifyNote("p5"), noteWindowWidth, true, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">纯五度</div>
          <div className="interval_semitone">7</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["p5"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["p5"].step} color={defaultNoteColor}
                      alter={noteSeries["p5"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 增5度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("aug5")}
           css={select_note_css(verifyNote("aug5"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">增五度</div>
          <div className="interval_semitone">8</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["aug5"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["aug5"].step} color={defaultNoteColor}
                      alter={noteSeries["aug5"].alter} fontSize={noteSize}/>}
        </div>
      </div>
    </div>
    {/*================================ 6度 ===============================================*/}
    <div className="line">
      <div className="interval_num">6</div>
      {/*======================================= 减6度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("dim6")}
           css={select_note_css(verifyNote("dim6"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">减六度</div>
          <div className="interval_semitone">7</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["dim6"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["dim6"].step} color={defaultNoteColor}
                      alter={noteSeries["dim6"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 小6度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("min6")}
           css={select_note_css(verifyNote("min6"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">小六度</div>
          <div className="interval_semitone">8</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["min6"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["min6"].step} color={defaultNoteColor}
                      alter={noteSeries["min6"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 大6度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("maj6")}
           css={select_note_css(verifyNote("maj6"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">大六度</div>
          <div className="interval_semitone">9</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["maj6"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["maj6"].step} color={defaultNoteColor}
                      alter={noteSeries["maj6"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 增6度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("aug6")}
           css={select_note_css(verifyNote("aug6"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">增六度</div>
          <div className="interval_semitone">10</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["aug6"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["aug6"].step} color={defaultNoteColor}
                      alter={noteSeries["aug6"].alter} fontSize={noteSize}/>}
        </div>
      </div>
    </div>

    {/*================================ 7度 ===============================================*/}
    <div className="line">
      <div className="interval_num">7</div>
      {/*======================================= 减7度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("dim7")}
           css={select_note_css(verifyNote("dim7"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">减七度</div>
          <div className="interval_semitone">9</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["dim7"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["dim7"].step} color={defaultNoteColor}
                      alter={noteSeries["dim7"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 小7度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("min7")}
           css={select_note_css(verifyNote("min7"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">小七度</div>
          <div className="interval_semitone">10</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["min7"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["min7"].step} color={defaultNoteColor}
                      alter={noteSeries["min7"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 大7度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("maj7")}
           css={select_note_css(verifyNote("maj7"), noteWindowWidth)}>
        <div className="description">
          <div className="interval_text">大七度</div>
          <div className="interval_semitone">11</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["maj7"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["maj7"].step} color={defaultNoteColor}
                      alter={noteSeries["maj7"].alter} fontSize={noteSize}/>}
        </div>
      </div>
      {/*======================================= 增7度 =============================================*/}
      <div className="cell"
           onClick={() => selectNewNote("aug7")}
           css={select_note_css(verifyNote("aug7"), noteWindowWidth, props.isAugDimShow)}>
        <div className="description">
          <div className="interval_text">增七度</div>
          <div className="interval_semitone">12</div>
        </div>
        <div className="note_window">
          {isUndefined(noteSeries["aug7"]) ? <BlankNoteText fontSize={noteSize} color={blankNoteColor}/> :
            <NoteText step={noteSeries["aug7"].step} color={defaultNoteColor}
                      alter={noteSeries["aug7"].alter} fontSize={noteSize}/>}
        </div>
      </div>
    </div>
  </div>
}

export default PhoneNotesPanel


const phone_notes2interval_css = css({
  borderRadius: 8,
  overflowX: "hidden",
  backgroundColor: "white",
  "& .interval_title": {
    ...cssPresets.flexCenter,
    paddingTop: 8, paddingBottom: 8,
    "&>span": {
      display: "block",
      fontFamily: "misans-m"
    }
  },
  "& .line:not(:first-of-type)": {
    borderTop: "1px solid #e6e6e6",
  },
  "& .line": {
    ...cssPresets.flexCenter,
    "& .interval_num": {
      width: 30,
      color: googleColors.blueGray800,
      height: "100%",
      ...cssPresets.flexCenter,
      fontSize: 18,
      fontFamily: "misans-m",
      userSelect: "none"
    },
    "& .cell:not(:first-of-type)": {
      borderLeft: "1px solid #e6e6e6",
    },
  }
})

const select_note_css = (isValid: boolean, noteWindowWidth: number, isShow = true, isDoubleLength = false) => {
  let w = noteWindowWidth
  if (!isShow) w = 0
  else {
    if (isDoubleLength) w = noteWindowWidth * 2
  }
  return css({
    ...cssPresets.transition,
    width: isShow ? w : 0,
    overflow: isShow ? "" : "hidden",
    opacity: isShow ? 1 : 0,
    transform: isShow ? "" : "scale(0)",
    minHeight: 45,
    whiteSpace: "nowrap",
    flexShrink: 0,
    ...cssPresets.flexCenter,
    flexDirection: "column",
    userSelect: "none",
    transition: "all ease 0.5s",
    "& .description": {
      margin: "0 auto",
      paddingTop: 8,
      fontSize: 14,
      fontFamily: "misans-m",
      userSelect: "none",
      display: "flex",
      overflowX: "hidden",
      "& .interval_text": {
        fontSize: "inherit",
        color: googleColors.gray800
      },
      "& .interval_semitone": {
        fontSize: "inherit",
        marginLeft: 3,
        color: googleColors.blue800
      }
    },
    "& .note_window": {
      ...cssPresets.flexCenter,
      alignItems: "start",
      paddingTop: 2,
      paddingBottom: 8,
      width: noteWindowWidth,
    },
    "&:hover": isMobile ? void 0 : {
      backgroundColor: isValid ? googleColors.gray200 : "white",
    }, "&:active": {
      backgroundColor: isValid ? googleColors.gray300 : "white"
    },
    cursor: isValid ? "pointer" : "default"
  })
}
