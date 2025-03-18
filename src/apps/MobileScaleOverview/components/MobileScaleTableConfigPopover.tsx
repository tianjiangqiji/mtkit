/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {Mask} from "antd-mobile";
import useScaleConfig from "@/assets/stores/useScaleConfig.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import OptionNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionNumberSvg.tsx";
import RomeNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionRomeNumberSvg.tsx";
import OptionRomeNumberSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionRomeNumberSvg.tsx";
import GoogleColors from "@/assets/colors/googleColors.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import OptionCharSvg from "@/apps/TabletScaleQuery/comps/svgs/OptionCharSvg.tsx";
import OptionScaleTableUpward from "@/apps/MobileScaleOverview/svgs/OptionScaleTableUpward.tsx";
import OptionScaleTableDownward from "@/apps/MobileScaleOverview/svgs/OptionScaleTableDownward.tsx";

const selectedColor = googleColors.deepOrange800
const unselectedColor = googleColors.gray400

const MobileScaleTableConfigPopover = () => {
  const {
    isMobileScaleConfigWindowOpen,
    setIsMobileScaleConfigWindowOpen,
    setIsRomeNumberStyle,
    isRomeNumberStyle,
    chordDisplayStyle,
    setChordDisplayStyle,
    isMobileScaleTableColumnReverse,
    setIsMobileScaleTableColumnReverse
  } = useScaleConfig()
  return <>
    <Mask visible={isMobileScaleConfigWindowOpen} destroyOnClose={true}
          style={{...cssPresets.defaultBlur, ...cssPresets.flexCenter}}
          onMaskClick={() => setIsMobileScaleConfigWindowOpen(!isMobileScaleConfigWindowOpen)}>
      <div css={MobileScaleTableConfigPopover_css}>
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
          <div className="option_label">音序排列</div>
          <div className="option_frame">
            <div className="option"
                 onClick={() => setIsMobileScaleTableColumnReverse(false)}
                 css={selected_css(!isMobileScaleTableColumnReverse)}>
              <div className="img">
                <OptionScaleTableDownward color={!isMobileScaleTableColumnReverse ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                低音在上
              </div>
            </div>
            <div className="option"
                 onClick={() => setIsMobileScaleTableColumnReverse(true)}
                 css={selected_css(isMobileScaleTableColumnReverse)}>
              <div className="img">
                <OptionScaleTableUpward color={isMobileScaleTableColumnReverse ? selectedColor : unselectedColor}/>
              </div>
              <div className="text">
                高音在上
              </div>
            </div>

          </div>
        </div>
      </div>
    </Mask>

  </>
}

export default MobileScaleTableConfigPopover

const MobileScaleTableConfigPopover_css = css({
  backgroundColor: "white",
  borderRadius: 8,
  userSelect: "none",
  fontFamily: "misans-m",
  paddingBottom: 50,
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 40,
  ...cssPresets.flexCenter,
  flexDirection: "column",
  overflow: "hidden",
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