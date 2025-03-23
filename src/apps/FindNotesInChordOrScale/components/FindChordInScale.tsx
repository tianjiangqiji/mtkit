/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import useFindChord from "@/apps/FindNotesInChordOrScale/useFindChord.tsx";
import useFindChordConfig from "@/assets/stores/useFindChordConfig.ts";
import {isArray} from "lodash";
import NoteByLocation from "@/components/reNote/NoteByLocation/NoteByLocation.tsx";
import googleColors from "@/assets/colors/googleColors.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import music12 from "music12";
import MajorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MajorScaleSymbol.tsx";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import MinorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MinorScaleSymbol";
import HalfDimScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/HalfDimScaleSymbol.tsx";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";
import collect from "collect.js";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";

const halfDimBgColor = googleColors.purple50
const halfDimStrokeColor = googleColors.purple800
const ScaleSvg = (props: {
  mode: string
}) => {
  const {
    majorScaleBgColor, majorScaleStrokeColor, minorScaleBgColor, minorScaleStrokeColor
  } = useScaleConfig()

  if (props.mode === "major") return <MajorScaleSymbol
    color={majorScaleStrokeColor} fill={majorScaleBgColor}/>
  if (props.mode === "minor") return <MinorScaleSymbol
    color={minorScaleStrokeColor} fill={minorScaleBgColor}/>
  return <HalfDimScaleSymbol/>
}
const FindChordInScale = () => {
  const navigate = useNavigate()
  const {findInScaleResult} = useFindChord()
  const {
    detailModeKeyAndLocation,
    setDetailModeKeyAndLocation
  } = useFindChordConfig()
  const {setMode} = useScaleConfig()
  const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  return <div css={FindOnlyChord_css}>
    {findInScaleResult.map((x, y) => <div
      onClick={() => setDetailModeKeyAndLocation([x.rootNoteLocation, x.mode])}
      onDoubleClick={() => {
        const rootNote = collect(music12.note.getNoteByLocation(x.rootNoteLocation)).random()
        setNotePickerAlter(rootNote.alter as any)
        setNotePickerStep(rootNote.step as any)
        setMode(x.mode)
        navigate(`/${routerPath.mobile_scaleTable}`, {replace: true})
      }}
      css={isSelected_css(isArray(detailModeKeyAndLocation) && detailModeKeyAndLocation[0] === x.rootNoteLocation
        && detailModeKeyAndLocation[1] === x.mode)}
      className="line" key={`${x.mode}_${x.rootNoteLocation}`}>
      <div className="order">{y + 1}</div>
      <div className="note_window">
        <div className="inner_f">
          <NoteByLocation color={googleColors.gray800} location={x.rootNoteLocation}/></div>
      </div>
      <div className="type">
        <div className="inner_svg_frame">
          <ScaleSvg mode={music12.scale.getModeTypeByModeKey(x.mode)}/>
        </div>
      </div>
      <div className="cn_name">
        {music12.scale.getModeNameByModeKey(x.mode)}
      </div>
    </div>)}
  </div>
}

export default FindChordInScale

const FindOnlyChord_css = css({
  width: "100%",
  paddingBottom: 50,
  "& .line:not(:first-of-type)": {
    borderTop: `1px solid ${googleColors.gray300}`
  },
  "& .line": {
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    maxWidth: 450,
    display: "flex",
    height: 40,

    "& .note_window": {
      width: "25%",
      ...cssPresets.flexCenter,
      "& .inner_f": {
        ...cssPresets.flexCenter,
        backgroundColor: googleColors.blue50,
        borderRadius: 999,
        height: 30,
        width: "80%"
      }
    },
    "& .order": {
      textAlign: "left",
      width: "15%",
      ...cssPresets.flexCenter,
    },
    "& .type": {
      width: "10%",
      height: "100%",
      ...cssPresets.flexCenter,
      "& .inner_svg_frame": {
        height: "60%",
        width: "60%",
        ...cssPresets.flexCenter
      }
    },
    "& .cn_name": {
      width: "50%",
      ...cssPresets.flexCenter
    }
  }
})

const isSelected_css = (i: boolean) => css({
  background: i ? googleColors.blue700 : "white",
  userSelect: "none",
  cursor: "pointer",
  // "&>div:not(:first-of-type)": {
  //   borderLeft: `1px solid ${i ? googleColors.yellow100 : googleColors.gray300}`
  // }
  "& .order": {
    color: i ? googleColors.blue50 : googleColors.blue800
  },
  "& .cn_name": {
    color: i ? googleColors.blue50 : googleColors.blue800
  }
})