/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import OptionNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNumberSvg.tsx";
import OptionRomeNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionRomeNumberSvg.tsx";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import OptionCharSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionCharSvg.tsx";
import OptionNoClefSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNoClefSvg.tsx";
import OptionNoteClefSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNoteClefSvg.tsx";
import OptionNaturalClefSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNaturalClefSvg.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import ClefG from "@/components/reStave/clefSvgs/ClefG.tsx";
import ClefC from "@/components/reStave/clefSvgs/ClefC.tsx";
import ClefF from "@/components/reStave/clefSvgs/ClefF.tsx";

const selectedColor = googleColors.deepOrange800
const unselectedColor = googleColors.gray400
const noWrapStyle = {whiteSpace: "nowrap"}
const MobileScaleStaveConfigPopover = () => {
  const {
    isMobileStaveConfigWindowOpen,
    setIsMobileStaveConfigWindowOpen,
    pianoNodeDisplayBy,
    setPianoNodeDisplayBy,
    staveAlterDisplayBy,
    setStaveAlterDisplayBy,
  } = useScaleConfig()
  const {clef, setClef} = useScoreHelperConfig()
  return <>
    <Mask visible={isMobileStaveConfigWindowOpen}
          style={{...cssPresets.defaultBlur,...cssPresets.flexCenter}}
          opacity={0.5}
          onMaskClick={() => setIsMobileStaveConfigWindowOpen(false)}
          destroyOnClose={true}>
      <div css={MobileScaleStaveConfigPopover_css}>
        <div className="line">
          <div className="option_label">乐谱显示</div>
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
        <div className="line">
          <div className="option_label">乐谱调号显示</div>
          <div className="option_frame">
            <div className="option long"
                 onClick={() => {
                   setStaveAlterDisplayBy("none")
                 }}
                 css={selected_css(staveAlterDisplayBy === "none")}>
              <div className="img">
                <OptionNoClefSvg color={staveAlterDisplayBy === "none" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                <span style={noWrapStyle}>强制</span>
                <span style={noWrapStyle}>不显示调号</span>
              </div>
            </div>
            {/*<div className="option long"*/}
            {/*     onClick={() => {*/}
            {/*       setStaveAlterDisplayBy("alters")*/}
            {/*     }}*/}
            {/*     css={selected_css(staveAlterDisplayBy === "alters")}>*/}
            {/*  <div className="img">*/}
            {/*    <OptionNoteClefSvg color={staveAlterDisplayBy === "alters" ? selectedColor : unselectedColor}/>*/}
            {/*  </div>*/}
            {/*  <div className="text">*/}
            {/*    <span style={noWrapStyle}>按调内</span>*/}
            {/*    <span style={noWrapStyle}>升降数</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="option long"
                 onClick={() => {
                   setStaveAlterDisplayBy("natural")
                 }}
                 css={selected_css(staveAlterDisplayBy === "natural")}>
              <div className="img">
                <OptionNaturalClefSvg color={staveAlterDisplayBy === "natural" ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                <span style={noWrapStyle}>按自然</span>
                <span style={noWrapStyle}>大小调</span>
              </div>
            </div>
          </div>
        </div>
        <div className="line">
          <div className="option_label">谱号</div>
          <div className="option_frame">
            <div className="option_clef"
                 onClick={() => {
                   setClef("G")
                 }}
                 css={selected_css(["G", "H"].includes(clef))}>
              <div className="img">
                <ClefG color={["G", "H"].includes(clef) ? selectedColor : unselectedColor}/>
              </div>
            </div>
            <div className="option_clef"
                 onClick={() => {
                   setClef("C")
                 }}
                 css={selected_css(["C", "M"].includes(clef))}>
              <div className="img">
                <ClefC color={["C", "M"].includes(clef) ? selectedColor : unselectedColor}/>
              </div>
            </div>
            <div className="option_clef"
                 onClick={() => {
                   setClef("F")
                 }}
                 css={selected_css(["F", "B"].includes(clef))}>
              <div className="img">
                <ClefF color={["F", "B"].includes(clef) ? selectedColor : unselectedColor}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Mask>

  </>
}

export default MobileScaleStaveConfigPopover

const MobileScaleStaveConfigPopover_css = css({
  backgroundColor: "white",
  borderRadius: 8,
  userSelect: "none",
  fontFamily: "misans-m",
  paddingBottom: 35,
  width: "calc(100vw)",
  maxWidth: 400,
  marginLeft: 10,
  marginRight: 10,
  paddingTop: 35,
  ...cssPresets.flexCenter,
  flexDirection: "column",
  overflow: "hidden",
  "& .line:not(:first-of-type)": {
    marginTop: 50
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
        paddingTop: 20, paddingLeft: 20, paddingRight: 20,
        paddingBottom: 15,
        flexDirection: "column",
        "& .img": {
          width: 30,
          height: 25
        },
        "& .text": {}
      },
      "& .long": {
        width: 130
      }
    },
    "& .option_long_frame": {
      ...cssPresets.flexCenter,
      flexDirection: "column",
      borderRadius: 8,
      overflow: "hidden",
      border: `1px solid ${GoogleColors.gray300}`,
      "& .option:not(:first-of-type)": {
        borderTop: `1px solid ${GoogleColors.gray300}`,
      },
      "& .option": {
        ...cssPresets.flexCenter,
        paddingTop: 20, paddingLeft: 20, paddingRight: 20,
        paddingBottom: 15,
        width: 200,
        flexDirection: "column",
        "& .img": {
          width: 30,
          height: 25
        },
        "& .text": {}
      },

    },
    "& .option_clef:not(:first-of-type)": {
      borderLeft: `1px solid ${GoogleColors.gray300}`,
    },
    "& .option_clef": {
      width: 100,
      height: 80,
      ...cssPresets.flexCenter,
      "& .img": {
        width: 40,
        height: 40,
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
