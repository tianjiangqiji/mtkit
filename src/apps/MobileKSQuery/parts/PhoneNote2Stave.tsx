/* eslint-disable no-mixed-spaces-and-tabs */
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {css} from "@emotion/react";
import React, {ReactNode} from "react";
import {useWindowSize} from "react-use";
import useScalesByNote from "@/apps/MobileKSQuery/useMobileKs/useScalesByNote.ts";
import ReverseNoteStave from "@/apps/TabletScaleQuery/comps/ReverseNoteStave.tsx";
import {clamp} from "lodash";
import {Swiper} from "antd-mobile";
import MobileScaleTable from "@/apps/MobileScaleOverview/parts/MobileScaleTable.tsx";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import routerPath from "@/router/routerPath.ts";
import {useNavigate} from "react-router-dom";

const minHeight = 670
const scaleTitleFontSize = 25
const scaleTitleColor = googleColors.blue800
const PhoneNote2Stave = () => {
  const {height} = useWindowSize()
  const {notePickerStep, notePickerAlter} = useGlobalSettings()
  const {setNotePickerStep, setNotePickerAlter} = useGlobalSettings()
  const {setMode} = useScaleConfig()
  const navigate = useNavigate()
  const scales = useScalesByNote()
  const MajorComp = () => <>
    <ReverseNoteStave
      staveAlters={scales.maj["actualStaveAlters"]}
      rawStaveAlters={scales.maj["rawStaveAlters"]}
      tonicStep={scales.maj["step"]}
      tonicAlter={scales.maj["alter"]}
      isTonicNoteReplaced={scales.maj["isTonicNoteReplaced"]}
      rawTonicStep={notePickerStep}
      rawTonicAlter={notePickerAlter}
      onClick={() => {
        setNotePickerStep(scales.maj["step"])
        setNotePickerAlter(scales.maj["alter"])
        setMode("MAJ")
        navigate(`/${routerPath.mobile_scaleTable}`, {replace: true})
      }}
      isMajor={true}/></>
  const MinorComp = () => <>
    <ReverseNoteStave
      staveAlters={scales.min["actualStaveAlters"]}
      rawStaveAlters={scales.min["rawStaveAlters"]}
      tonicStep={scales.min["step"]}
      tonicAlter={scales.min["alter"]}
      isTonicNoteReplaced={scales.min["isTonicNoteReplaced"]}
      rawTonicStep={notePickerStep}
      rawTonicAlter={notePickerAlter}
      onClick={() => {
        setNotePickerStep(scales.min["step"])
        setNotePickerAlter(scales.min["alter"])
        setMode("MIN")
        navigate(`/${routerPath.mobile_scaleTable}`, {replace: true})
      }}
      isMajor={false}/></>
  return <>
    <div css={PhoneNote2Stave_css(height)}>
      {height >= 700 ? <><MajorComp/> <MinorComp/>  </> : <>
        <Swiper
          loop={true}
          style={{height: "90%", width: "100%"}}
          indicatorProps={{
            style: {
              '--dot-size': '10px',
              '--active-dot-size': '30px',
              '--dot-border-radius': '100%',
              '--active-dot-border-radius': '15px',
              '--dot-spacing': '18px',
            }
          }}>
          <Swiper.Item key={0}>
            <Flex>
              <MajorComp/>
            </Flex>
          </Swiper.Item>
          <Swiper.Item key={1}>
            <Flex>
              <MinorComp/>
            </Flex>
          </Swiper.Item>
        </Swiper>
      </>}

    </div>
  </>
}

export default PhoneNote2Stave

const PhoneNote2Stave_css = (height: number) => css({
  ...cssPresets.flexCenter,
  width: "100%",
  justifyContent: "center",
  height: "100%",
  overflowX: "auto",
  overflowY: "auto",
  flexDirection: "column",
  ...cssPresets.transition,
  gap: clamp(height / 15, 40, 80),
  "& .scale": {
    ...cssPresets.flexCenter,
    flexDirection: "column",
    "& .tonic_replaced": {
      fontFamily: "misans-m",
      fontSize: 15,
      color: googleColors.red800,
      ...cssPresets.flexCenter,
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
      "&>span": {
        marginRight: 5,
      },
      "&:active": {
        backgroundColor: googleColors.gray300
      },
    },
    "& .up_part": {
      ...cssPresets.flexCenter,
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
          width: "fit-content",
        }
      },
    },
  }
})

const Flex = (props: {
  children: ReactNode
}) => {
  return <div style={{width: '100%', height: '100%', ...cssPresets.flexCenter}}>
    {props.children}
  </div>
}