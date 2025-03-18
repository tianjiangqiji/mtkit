/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import React, {useState} from "react";
import OctavePiano from "@/components/rePiano/OctavePiano.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useScaleInstance from "@/apps/TabletScaleQuery/useTabletScaleQuery/useScaleInstance.tsx";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import OptionCharSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionCharSvg.tsx";
import OptionNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNumberSvg.tsx";
import OptionRomeNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionRomeNumberSvg.tsx";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import {useWindowSize} from "react-use";
import {GrPowerCycle} from "react-icons/gr";
// 默认的钢琴键盘配置
const pianoConfig = {
  whiteKeyWidth: 34,
  blackKeyBorderWidth: 2,
  whiteKeyBorderRadius: Array.from({length: 7}, () => [0, 0, 5, 5])
}
const selectedColor = googleColors.deepOrange800
const unselectedColor = googleColors.gray400
const MobileScalePiano = () => {
  const {slicedLocationList, colorList, nodeList} = useScaleInstance()
  const {pianoNodeDisplayBy, setPianoNodeDisplayBy} = useScaleConfig()
  const {width, height} = useWindowSize()
  const [isLeftRotate, setLeftRotate] = useState<boolean>(true)
  return <>
    <div css={MobileScalePiano_css(isLeftRotate, width)}>
      <div className="transform_frame">
        <div className="piano_frame">
          <OctavePiano config={{...pianoConfig, keyBgColorList: colorList[0]}} keyNodeList={nodeList[0]}
                       isPureDisplay={true}/>
          <OctavePiano config={{...pianoConfig, keyBgColorList: colorList[1]}}
                       keyNodeList={nodeList[1]}
                       ml={-2} isPureDisplay={true}/>
        </div>
        <div className="hello">
          <div className="left">
            <div className="line">
              <div className="option_label">钢琴显示</div>
              <div className="option_frame">
                <div className="option"
                     onClick={() => {
                       setPianoNodeDisplayBy("note")
                     }}
                     css={selected_css(pianoNodeDisplayBy === "note")}>
                  <div className="img">
                    <OptionCharSvg color={pianoNodeDisplayBy === "note" ? selectedColor : unselectedColor}/>
                  </div>
                  <div className="text">
                    调内音符
                  </div>
                </div>
                <div className="option"
                     onClick={() => {
                       setPianoNodeDisplayBy("number")
                     }}
                     css={selected_css(pianoNodeDisplayBy === "number")}>
                  <div className="img">
                    <OptionNumberSvg color={pianoNodeDisplayBy === "number" ? selectedColor : unselectedColor}/>
                  </div>
                  <div className="text">
                    数字音级
                  </div>
                </div>
                <div className="option"
                     onClick={() => {
                       setPianoNodeDisplayBy("rome")
                     }}
                     css={selected_css(pianoNodeDisplayBy === "rome")}>
                  <div className="img">
                    <OptionRomeNumberSvg color={pianoNodeDisplayBy === "rome" ? selectedColor : unselectedColor}/>
                  </div>
                  <div className="text">
                    罗马音级
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right" onClick={() => setLeftRotate(!isLeftRotate)}>
            <GrPowerCycle color={googleColors.blue800} size={30}/>
          </div>
        </div>
      </div>

    </div>
  </>
}

export default MobileScalePiano

const MobileScalePiano_css = (isLeftRotate: boolean, w: number) => css({
  width: "100%",
  height: "100%",
  "& .transform_frame": {
    transition: "all ease 0.5s",
    width: 500,
    height: 300,
    // backgroundColor: "red",
    ...cssPresets.flexCenter,
    flexDirection: "column",
    transformOrigin: "top left",
    transform: `rotate(${isLeftRotate ? 90 : -90}deg)
     translate(${isLeftRotate ? -20 : -480}px , ${isLeftRotate ? -w + (w - 300) / 2 : (w - 300) / 2}px) `,
    "& .hello": {
      ...cssPresets.flexCenter,
      userSelect: "none",
      marginTop: 25,
      "& .left": {
        "& .line": {
          fontFamily:"misans-m",
          "& .option_label": {
            fontSize: 16,
            color: GoogleColors.gray600,
            marginBottom: 5
          },
          "& .option_frame": {
            ...cssPresets.flexCenter,
            borderRadius: 8,
            overflow: "hidden",
            border: `1px solid ${GoogleColors.gray300}`,

            "& .option:not(:first-of-type)": {
              borderLeft: `1px solid ${GoogleColors.gray300}`,
            },
            "& .option": {
              ...cssPresets.flexCenter,
              paddingTop: 20,
              paddingLeft: 20, paddingRight: 20,
              paddingBottom: 15,
              flexDirection: "column",
              "& .img": {
                width: 30,
                height: 25
              }
            }
          }
        }
      },
      "& .right": {
        backgroundColor: "white",
        borderRadius: 999,
        width: 80,
        height: 80,
        ...cssPresets.flexCenter,
        marginLeft: 35,
        marginTop: 28,
        ...cssPresets.transition,
        "&:active": {
          backgroundColor: googleColors.gray300
        }
      }
    }
  },
  "& .piano_frame": {
    maxWidth: 500,
    ...cssPresets.flexCenter,

  }
})

const selected_css = (i: boolean) => css({
  transition: "all ease 0.1s",
  cursor: "pointer",
  backgroundColor: i ? googleColors.amber200 : googleColors.gray50,
  color: i ? googleColors.deepOrange800 : googleColors.gray500,
  "& .img,.text": {
    transition: "all ease 0.3s",
    transform: i ? "scale(1.02)" : "scale(0.95)",
  }
})