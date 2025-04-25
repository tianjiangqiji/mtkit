/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Mask, Segmented} from "antd-mobile";
import {useEffect, useRef, useState} from "react";
import UseScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import OptionNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNumberSvg.tsx";
import RomeNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionRomeNumberSvg.tsx";
import OptionCharSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionCharSvg.tsx";
import OptionRomeNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionRomeNumberSvg.tsx";
import OptionNoClefSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNoClefSvg.tsx";
import OptionNoteClefSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNoteClefSvg.tsx";
import OptionNaturalClefSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNaturalClefSvg.tsx";

const selectedColor = googleColors.deepOrange800
const unselectedColor = googleColors.gray400
const ScaleConfigPopover = () => {
  const {
    isScaleConfigOpen,
    setIsScaleConfigOpen,
    isRomeNumberStyle,
    setIsRomeNumberStyle,
    chordDisplayStyle,
    setChordDisplayStyle,
    staveAlterDisplayBy,
    setStaveAlterDisplayBy,
    pianoNodeDisplayBy,
    setPianoNodeDisplayBy
  } = UseScaleConfig()
  return <>
    <Mask visible={isScaleConfigOpen} destroyOnClose={true}
          style={{...cssPresets.defaultBlur, ...cssPresets.flexCenter}}
          onMaskClick={() => setIsScaleConfigOpen(false)}>
      <div css={ScaleConfigPopover_css}>
        <div className="line">
          <div className="option_label">表头音级</div>
          <div className="option_frame">
            <div className="option"
                 onClick={() => setIsRomeNumberStyle(false)}
                 css={selected_css(!isRomeNumberStyle)}>
              <div className="img">
                <OptionNumberSvg color={!isRomeNumberStyle ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                普通数字
              </div>

            </div>
            <div className="option"
                 onClick={() => setIsRomeNumberStyle(true)}
                 css={selected_css(isRomeNumberStyle)}>
              <div className="img">
                <RomeNumberSvg color={isRomeNumberStyle ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                罗马数字
              </div>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="option_label">和弦显示方式</div>
          <div className="option_frame">
            <div className="option"
                 onClick={() => setChordDisplayStyle("note")}
                 css={selected_css(chordDisplayStyle === "note")}>
              <div className="img">
                <OptionCharSvg color={chordDisplayStyle === "note" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                调内音符
              </div>
            </div>
            <div className="option"
                 onClick={() => setChordDisplayStyle("number")}
                 css={selected_css(chordDisplayStyle === "number")}>
              <div className="img">
                <OptionNumberSvg color={chordDisplayStyle === "number" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                数字级数
              </div>
            </div>
            <div className="option"
                 onClick={() => setChordDisplayStyle("rome")}
                 css={selected_css(chordDisplayStyle === "rome")}>
              <div className="img">
                <OptionRomeNumberSvg color={chordDisplayStyle === "rome" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                罗马级数
              </div>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="option_label">乐谱调号显示</div>
          <div className="option_frame">
            <div className="option"
                 onClick={() => setStaveAlterDisplayBy("none")}
                 css={selected_css(staveAlterDisplayBy === "none")}>
              <div className="img">
                <OptionNoClefSvg color={staveAlterDisplayBy === "none" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                强制无调号
              </div>
            </div>
            {/*<div className="option"*/}
            {/*     onClick={() => setStaveAlterDisplayBy("alters")}*/}
            {/*     css={selected_css(staveAlterDisplayBy === "alters")}>*/}
            {/*  <div className="img">*/}
            {/*    <OptionNoteClefSvg color={staveAlterDisplayBy === "alters" ? selectedColor : unselectedColor}/>*/}
            {/*  </div>*/}
            {/*  <div className="text">*/}
            {/*    按调内升降数*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="option"
                 onClick={() => setStaveAlterDisplayBy("natural")}
                 css={selected_css(staveAlterDisplayBy === "natural")}>
              <div className="img">
                <OptionNaturalClefSvg color={staveAlterDisplayBy === "natural" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                按自然调式
              </div>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="option_label">钢琴显示</div>
          <div className="option_frame">
            <div className="option"
                 onClick={() => setPianoNodeDisplayBy("none")}
                 css={selected_css(pianoNodeDisplayBy === "none")}>
              <div className="img">
                <OptionNoClefSvg color={pianoNodeDisplayBy === "none" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                不显示
              </div>
            </div>
            <div className="option"
                 onClick={() => setPianoNodeDisplayBy("note")}
                 css={selected_css(pianoNodeDisplayBy === "note")}>
              <div className="img">
                <OptionCharSvg color={pianoNodeDisplayBy === "note" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                调内音符
              </div>
            </div>
            <div className="option"
                 onClick={() => setPianoNodeDisplayBy("number")}
                 css={selected_css(pianoNodeDisplayBy === "number")}>
              <div className="img">
                <OptionNumberSvg color={pianoNodeDisplayBy === "number" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                数字音级
              </div>
            </div>
            <div className="option"
                 onClick={() => setPianoNodeDisplayBy("rome")}
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
    </Mask>
  </>
}

export default ScaleConfigPopover

const ScaleConfigPopover_css = css({
  paddingBottom: 50,
  paddingLeft: 60,
  paddingRight: 60,
  paddingTop: 40,
  ...cssPresets.flexCenter,
  flexDirection: "column",
  backgroundColor: "white",
  borderRadius: 8,
  overflow: "hidden",
  userSelect: "none",
  fontFamily: "misans-m",
  "& .line:not(:first-of-type)": {
    marginTop: 30
  },
  "& .line": {
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
        paddingTop: 10, paddingLeft: 20, paddingRight: 20,
        paddingBottom: 5,
        flexDirection: "column",
        "& .img": {
          width: 30,
          height: 25
        }
      }
    }
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
