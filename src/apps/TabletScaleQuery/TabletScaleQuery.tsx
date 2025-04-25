/* eslint-disable no-mixed-spaces-and-tabs */
import StaveConfigPopover from "@/apps/MobileKSQuery/comps/StaveConfigPopover.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import {css} from "@emotion/react";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";
import TabletScorePickerBar from "@/apps/TabletScaleQuery/parts/TabletScorePickerBar.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import ScalePickerPopover from "@/apps/TabletScaleQuery/comps/ScalePicker/ScalePickerPopover.tsx";
import ScaleConfigPopover from "@/apps/TabletScaleQuery/comps/ScalePicker/ScaleConfigPopover.tsx";
import QueryScaleByNote from "@/apps/TabletScaleQuery/parts/QueryScaleByNote.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import QueryScalesByAlter from "@/apps/TabletScaleQuery/parts/QueryScalesByAlter.tsx";


const pickerHeight = 80
const TabletScaleQuery = () => {

  const isWideScreen = useIsWideScreen();
  const {naviBarHeight} = useGlobalSettings();
  const navigate = useNavigate()
  const {isStaveQueryReverse} = useScoreHelperConfig()


  // 如果是移动端，自动跳转
  useEffect(() => {
    if (!isWideScreen) {
      navigate(`/${routerPath.mobile_ksQuery}`, {replace: true})
    }
  }, [isWideScreen, navigate])


  return <>
    <NotePicker/>
    <StaveConfigPopover/>
    <ScalePickerPopover/>
    <ScaleConfigPopover/>
    <div css={score_helper_css(naviBarHeight)}>
      <TabletScorePickerBar barHeight={pickerHeight}/>
      <div className="main_frame">
        <div style={{minHeight: 500, transition: "all ease 0.3s"}}>
          <div style={{
            maxHeight: isStaveQueryReverse ? 999 : 0,
            transition: "all ease 0.3s",
            transitionDelay: isStaveQueryReverse ? "0.3s" : "0s",
            opacity: isStaveQueryReverse ? 1 : 0,
            transform: isStaveQueryReverse ? "scale(1)" : "scale(0)",
            overflowY: "hidden"
          }}>
            <QueryScalesByAlter/>
          </div>
          <div style={{
            maxHeight: !isStaveQueryReverse ? 999 : 0,
            transition: "all ease 0.3s",
            transitionDelay: !isStaveQueryReverse ? "0.3s" : "0s",
            transform: !isStaveQueryReverse ? "scale(1)" : "scale(0)",
            opacity: !isStaveQueryReverse ? 1 : 0,
            overflowY: "hidden"
          }}>
            <QueryScaleByNote/>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default TabletScaleQuery

const score_helper_css = (naviBarHeight: number,) => css({
  width: "calc(100vw)",
  height: `calc(100vh - ${naviBarHeight}px)`,
  overflowX: "hidden",
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .main_frame": {
    width: "100%",
    // height: `calc(100% - ${pickerHeight}px)`,
    overflowX: "hidden",
    overflowY: "auto",

  },
  "& .piano_frame": {
    marginLeft: "auto",
    marginRight: "auto",
    ...cssPresets.flexCenter,
    marginTop: 20
  }
})
