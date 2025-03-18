/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {css} from "@emotion/react";
import React from "react";
import cssPresets from "@/assets/styles/cssPresets.ts";
import CircleOfFifthsWindow from "@/apps/CircleOfFifths/parts/CircleOfFifthsWindow.tsx";
import ZoomConfig from "@/apps/CircleOfFifths/comps/ZoomConfig.tsx";
import RotatePanel from "@/apps/CircleOfFifths/parts/RotatePanel.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";


const CircleOfFifths = () => {
  const {naviBarHeight} = useGlobalSettings()
  return <>
    <div css={circle_of_fifths_css(naviBarHeight)}>
      <CircleOfFifthsWindow/>
      <ZoomConfig/>
      <RotatePanel/>
    </div>
  </>
}

export default CircleOfFifths

const circle_of_fifths_css = (h: number) => css({
  width: "100%",
  height: `calc(100vh - ${h}px)`,
  overflow: "hidden",
  ...cssPresets.flexCenter,
  flexDirection: "column",
})