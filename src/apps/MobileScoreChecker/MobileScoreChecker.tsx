/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import StaveSlide from "@/apps/MobileScoreChecker/part/StaveSlide.tsx";
import PianoSlide from "@/apps/MobileScoreChecker/part/PianoSlide.tsx";
import ConfigWindow from "@/apps/MobileScoreChecker/part/ConfigWindow.tsx";
import ConfigPopover from "@/apps/MobileScoreChecker/components/ConfigPopover.tsx";

const MobileScoreChecker = () => {
  const {naviBarHeight} = useGlobalSettings()
  return <>
    <ConfigPopover/>
    <div css={MobileStaveChecker_css(naviBarHeight)}>
      <StaveSlide/>
      <PianoSlide/>
      <div className="description">
        部分设备可滑动乐谱或钢琴以调整音符
      </div>
      <ConfigWindow/>

    </div>
  </>
}

export default MobileScoreChecker

const MobileStaveChecker_css = (naviBarHeight: number) => css({
  width: "100%",
  height: `calc( 100vh - ${naviBarHeight}px)`,
  ...cssPresets.flexCenter,
  flexDirection: "column",
  userSelect: "none",
  "& .description": {
    fontSize: 15,
    color: "gray",
    textAlign: "center",
    marginTop: 10
  },
})
