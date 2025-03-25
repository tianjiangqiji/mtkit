/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {BiLeftArrow} from "react-icons/bi";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import googleColors from "@/assets/colors/googleColors.ts";
import useHarmonicSeriesConfig from "@/assets/stores/useHarmonicSeriesConfig.ts";
import {max, min} from "lodash";
import {useWindowSize} from "react-use";


const OptionBar = () => {
  const {setScrollLeft, scrollLeft} = useHarmonicSeriesConfig()
  const {width} = useWindowSize()
  const move = (i: boolean) => {
    if (i) {
      return setScrollLeft(max([scrollLeft - 180, 0]))
    }
    setScrollLeft(min([scrollLeft + 180, width >= 490 ? 480 : 640]))
  }
  return <>
    <div css={OptionBar_css}>
      <div className="option_bar_item" onClick={() => move(true)}>
        <BsArrowLeft></BsArrowLeft>
        <div style={{marginLeft: 5}}>前移</div>
      </div>
      <div className="option_bar_item" onClick={() => setScrollLeft(0)}>
        <div>重置位置</div>
      </div>
      <div className="option_bar_item" onClick={() => move(false)}>
        <BsArrowRight></BsArrowRight>
        <div style={{marginLeft: 5}}>后移</div>
      </div>
    </div>
  </>
}

export default OptionBar

const OptionBar_css = css({
  height: 60,
  userSelect: "none",
  ...cssPresets.flexCenter,
  alignItems: "start",
  width: "100%",
  gap: 10,
  "& .option_bar_item": {
    width: 100,
    height: 40,
    backgroundColor:googleColors.blue50,
    border: `1px solid ${googleColors.blue500}`,
    ...cssPresets.flexCenter,
    color: googleColors.blue800,
    borderRadius: 999,
    userSelect: "none",
    cursor: "pointer",
    ...cssPresets.transition,
    "&:active": {
      backgroundColor: googleColors.blue100,
    }
  }
})
