/* eslint-disable no-mixed-spaces-and-tabs */

import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import {TbAdjustmentsHorizontal} from "react-icons/tb";
import ScalePickerPopover from "@/apps/TabletScaleQuery/comps/ScalePicker/ScalePickerPopover.tsx";
import TabletScalePickerWindow from "@/apps/TabletScaleQuery/comps/ScalePicker/TabletScalePickerWindow.tsx";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import React from "react";
import ScaleConfigPopover from "@/apps/TabletScaleQuery/comps/ScalePicker/ScaleConfigPopover.tsx";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";

const selectorHeight = 55
const switchOnColor = googleColors.blue800
const TabletScorePickerBar = (props: {
  barHeight: number;
}) => {
  const {notePickerStep, notePickerAlter, setNotePickerOpen} = useGlobalSettings()
  const {
    isStaveQueryReverse,
    setIsStaveQueryReverse,
    setIsStaveConfigOpen,
    isStaveConfigOpen,
  } = useScoreHelperConfig();
  const {setIsScaleConfigOpen} = useScaleConfig()
  return <>

    <div css={phone_score_helper_picker_css(!isStaveQueryReverse, props.barHeight)}>
      <div className="functional_area">
        <div className="switch_reverse" onClick={() => setIsStaveQueryReverse(!isStaveQueryReverse)}>
          <HiOutlineSwitchHorizontal style={{marginLeft: 5}} size={23} color={switchOnColor}/>
        </div>
        <div className="stave_config" onClick={() => {
          if (isStaveQueryReverse) return setIsStaveConfigOpen(true)
          setIsScaleConfigOpen(true)
          // setIsStaveConfigOpen(true)
        }}>
          <TbAdjustmentsHorizontal style={{marginRight: 5}} size={23} color={switchOnColor}/>
        </div>
      </div>
      <div className="picker_note_window">
        <TabletScalePickerWindow/>
      </div>
    </div>
  </>
}

export default TabletScorePickerBar
const phone_score_helper_picker_css = (isStaveQueryReverse: boolean, bh: number) => css({
  width: "100%",
  // maxWidth: 400,
  height: bh,
  paddingLeft: 15,
  paddingRight: 15,
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .functional_area": {
    height: selectorHeight,
    maxHeight: 220,
    marginRight: isStaveQueryReverse ? 20 : 0,
    ...cssPresets.transition,
    width: isStaveQueryReverse ? 140 : 230,
    backgroundColor: "white",
    borderRadius: 999,
    ...cssPresets.flexCenter,
    fontFamily: "misans-m",
    border: `1px solid ${googleColors.gray300}`,
    overflow: "hidden",

    "& .switch_reverse": {
      boxSizing: "border-box",
      height: "100%",
      width: "50%",
      ...cssPresets.flexCenter,
      color: googleColors.gray800,
      transition: "all ease 0.4s",
      cursor: "pointer",
      ...cssPresets.defaultHoverAndActive as any,
    },
    "& .stave_config": {
      boxSizing: "border-box",
      borderLeft: `1px solid ${googleColors.gray200}`,
      height: "100%",
      width: "50%",
      ...cssPresets.flexCenter,
      color: googleColors.gray800,
      transition: "all ease 0.4s",
      cursor: "pointer",
      ...cssPresets.defaultHoverAndActive as any,
    },
  },

  "& .picker_note_window": {
    userSelect: "none",
    maxWidth: isStaveQueryReverse ? 300 : 0,
    boxSizing: "border-box",
    transform: isStaveQueryReverse ? "scale(1)" : "scale(0)",
    opacity: isStaveQueryReverse ? 1 : 0,
    height: selectorHeight,
    backgroundColor: "white",
    border: `1px solid ${googleColors.gray200}`,

    borderRadius: 999,
    ...cssPresets.flexCenter,
    cursor: "pointer",
    transition: "all ease-in-out 0.3s",
    textOverflow: "clip",
    ...cssPresets.defaultHoverAndActive as any,
  }
})
