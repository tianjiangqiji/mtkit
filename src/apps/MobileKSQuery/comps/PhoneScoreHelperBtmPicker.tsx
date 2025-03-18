/* eslint-disable no-mixed-spaces-and-tabs */

import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import {css} from "@emotion/react";
import NoteText from "@/components/reNote/NoteText/NoteText.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {isMobile} from "react-device-detect";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import {TbAdjustmentsHorizontal} from "react-icons/tb";

const selectorHeight = 55
const switchOnColor = googleColors.blue800
const PhoneScoreHelperBtmPicker = () => {
  const {notePickerStep, notePickerAlter, setNotePickerOpen} = useGlobalSettings()
  const {isStaveQueryReverse, setIsStaveQueryReverse, setIsStaveConfigOpen, isStaveConfigOpen} = useScoreHelperConfig();
  return <>

    <div css={phone_score_helper_picker_css(!isStaveQueryReverse)}>
      <div className="functional_area">
        <div className="switch_reverse" onClick={() => setIsStaveQueryReverse(!isStaveQueryReverse)}>
          <HiOutlineSwitchHorizontal style={{marginLeft: 5}} size={23} color={switchOnColor}/>
        </div>
        <div className="stave_config" onClick={() => setIsStaveConfigOpen(!isStaveConfigOpen)}>
          <TbAdjustmentsHorizontal style={{marginRight: 5}} size={23} color={switchOnColor}/>
        </div>
      </div>
      <div className="picker_note_window" onClick={() => setNotePickerOpen(true)}>
        <NoteText step={notePickerStep} alter={notePickerAlter} fontSize={35}/>
      </div>
    </div>
  </>
}

export default PhoneScoreHelperBtmPicker
const phone_score_helper_picker_css = (isStaveQueryReverse: boolean) => css({
  width: "100%",
  maxWidth: 400,
  paddingLeft: 15,
  paddingRight: 15,
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  justifyContent: "center",
  "& .functional_area": {
    height: selectorHeight,
    maxHeight: 220,
    marginRight: isStaveQueryReverse ? 20 : 0,
    backgroundColor: "white",
    borderRadius: 999,
    ...cssPresets.flexCenter,
    fontFamily: "misans-m",
    border: `1px solid ${googleColors.gray300}`,
    overflow: "hidden",

    "& .switch_reverse": {
      boxSizing: "border-box",
      height: "100%",
      width: isStaveQueryReverse ? 100 : 100,
      ...cssPresets.flexCenter,
      color: googleColors.gray800,
      transition: "all ease 0.1s",
      cursor: "pointer",
      "&:hover": isMobile ? "" : {
        backgroundColor: googleColors.gray200,
      }, "&:active": {
        backgroundColor: googleColors.gray300,
      },
    },
    "& .stave_config": {
      boxSizing: "border-box",
      borderLeft: `1px solid ${googleColors.gray200}`,
      height: "100%",
      width: isStaveQueryReverse ? 0 : 120,
      ...cssPresets.flexCenter,
      color: googleColors.gray800,
      transition: "all ease 0.1s",
      cursor: "pointer",
      "&:hover": isMobile ? "" : {
        backgroundColor: googleColors.gray200,
      }, "&:active": {
        backgroundColor: googleColors.gray300,
      },
    },
  },

  "& .picker_note_window": {
    userSelect: "none",
    width: isStaveQueryReverse ? 100 : 0,
    transform: isStaveQueryReverse ? "scale(100%)" : "scale(0)",
    opacity: isStaveQueryReverse ? 1 : 0,
    height: selectorHeight,
    backgroundColor: "white",
    border: `1px solid ${googleColors.gray300}`,

    borderRadius: 999,
    ...cssPresets.flexCenter,
    cursor: "pointer",
    transition: "all ease-in-out 0.1s,transform ease 0.6s,width ease 0.4s",
    "&:hover": {
      backgroundColor: googleColors.gray200,
    }, "&:active": {
      backgroundColor: googleColors.gray300,
    },
  }
})
