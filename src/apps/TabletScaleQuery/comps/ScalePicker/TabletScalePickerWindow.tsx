/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import React, {forwardRef, useMemo} from "react";
import MajorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MajorScaleSymbol.tsx";
import music12 from "../../../../../../music12";
import MinorScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/MinorScaleSymbol.tsx";
import HalfDimScaleSymbol from "@/apps/TabletScaleQuery/symbolSVG/HalfDimScaleSymbol.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";

const TabletScalePickerWindow = forwardRef<HTMLDivElement, any>((props, ref) => {
  const {
    configInnerHeight,
    mode,
    setIsScalePickerOpen,
    majorScaleStrokeColor,
    majorScaleBgColor,
    minorScaleBgColor,
    minorScaleStrokeColor,
  } = useScaleConfig()
  const {notePickerAlter, notePickerStep, setNotePickerOpen} = useGlobalSettings()
  const isMajorIcon = music12.scale.MajorModeGroup.includes(mode)
  const isMinorIcon = music12.scale.MinorModeGroup.includes(mode)
  const scaleName = useMemo(() => {
    switch (mode) {
      case music12.scale.ScaleMode.NaturalMajor:
        return "自然大调 Ionian"
      case music12.scale.ScaleMode.NaturalMinor:
        return "自然小调 Aeolian"
      case music12.scale.ScaleMode.HarmonicMajor:
        return "和声大调"
      case music12.scale.ScaleMode.HarmonicMinor:
        return "和声小调"
      case music12.scale.ScaleMode.MelodicMinorAscending:
        return "旋律小调上行"
      case music12.scale.ScaleMode.MelodicMajorDescending:
        return "旋律大调下行"
      case music12.scale.ScaleMode.Mixolydian:
        return "Mixolydian"
      case music12.scale.ScaleMode.Dorian:
        return "Dorian"
      case music12.scale.ScaleMode.Phrygian:
        return "Phrygian"
      case music12.scale.ScaleMode.Lydian:
        return "Lydian"
      case music12.scale.ScaleMode.Locrian:
        return "Locrian"
      default:
        return "未知"
    }
  }, [mode])
  return <>
    <div css={ConfigBar_css(configInnerHeight, false)} ref={ref}>
      <div className="note_scale_frame">
        <div className="note_frame" onClick={() => setNotePickerOpen(true)}>
          <NoteText step={notePickerStep} alter={notePickerAlter} fontSize={35}/>
        </div>
        <div className="scaleWindow" onClick={() => setIsScalePickerOpen(true)}>
          <div className="icon">
            {isMajorIcon && <MajorScaleSymbol color={majorScaleStrokeColor} fill={majorScaleBgColor}/>}
            {isMinorIcon && <MinorScaleSymbol color={minorScaleStrokeColor} fill={minorScaleBgColor}/>}
            {mode === music12.scale.ScaleMode.Locrian &&
                <HalfDimScaleSymbol/>}
          </div>
          <div className="desc">
            {scaleName}
          </div>
        </div>
      </div>

    </div>
  </>
})

export default TabletScalePickerWindow

const ConfigBar_css = (h: number, b: boolean) => css({
  width: "100%",

  paddingTop: 15,
  paddingBottom: 15,
  ...cssPresets.flexCenter,
  flexWrap: "wrap",
  gap: 15,
  flexDirection: "row",
  userSelect: "none",
  "& .note_scale_frame": {
    ...cssPresets.flexCenter,
    borderRadius: 999,
    overflow: "hidden",
    userSelect: "none",
    height: h,

    "& .note_frame": {
      height: h,
      width: 80,
      ...cssPresets.flexCenter,
      backgroundColor: "white",
      paddingLeft: 5,
      cursor: "pointer",
      overflow: "hidden",
      ...cssPresets.defaultHoverAndActive as any
    },
    "& .scaleWindow": {
      height: h,
      width: b ? 0 : 240,
      ...cssPresets.flexCenter,
      overflow: "hidden",
      backgroundColor: "white",
      borderLeft: `1px solid ${googleColors.gray200}`,
      ...cssPresets.defaultHoverAndActive as any,
      transition: "all ease 0.3s",
      "& .icon": {
        width: b ? 0 : 30,
        height: 30,
        marginLeft: -8,
        transition: "all ease 0.3s"
      },
      "& .desc": {
        fontFamily: "misans-m",
        fontSize: b ? 0 : 18,
        marginLeft: 6,
        color: googleColors.gray800,
        overflow: "hidden",
        transition: "all ease 0.3s"
      }
    }
  },
  "& .function_area_frame": {
    ...cssPresets.flexCenter,
    borderRadius: 999,
    overflow: "hidden",
    "& .item": {
      width: 60,
      height: 55,
      backgroundColor: "white"
    }
  }
})
