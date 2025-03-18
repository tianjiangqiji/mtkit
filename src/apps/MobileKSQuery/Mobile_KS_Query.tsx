/* eslint-disable no-mixed-spaces-and-tabs */
import PhoneAlters2Stave from "./parts/PhoneAlters2Stave.tsx";
import PhoneNote2Stave from "./parts/PhoneNote2Stave.tsx";
import PhoneScoreHelperBtmPicker from "./comps/PhoneScoreHelperBtmPicker.tsx";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import useScoreHelperConfig from "@/assets/stores/useScoreHelperConfig.ts";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import {css} from "@emotion/react";
import React, {useEffect} from "react";
import StaveConfigPopover from "./comps/StaveConfigPopover.tsx";
import {useNavigate} from "react-router-dom";
import routerPath from "@/router/routerPath.ts";

const pickerHeight = 80
const Mobile_KS_Query = () => {
  const isWideScreen = useIsWideScreen();
  const {isStaveQueryReverse} = useScoreHelperConfig();
  const {naviBarHeight} = useGlobalSettings();
  const navigate = useNavigate()
  useEffect(() => {
    if (isWideScreen) {
      navigate(`/${routerPath.tablet_scaleQuery}`, {replace: true})
    }
  }, [isWideScreen, navigate])
  return <>
    <NotePicker/>
    <StaveConfigPopover/>
    <div css={score_helper_css(naviBarHeight)}>
      <div className="phone_score_helper">
        <div className="main_frame">
          {!isStaveQueryReverse && <PhoneNote2Stave/>}
          {isStaveQueryReverse && <PhoneAlters2Stave/>}
        </div>
        <div className="btm_picker">
          <PhoneScoreHelperBtmPicker/>
        </div>
      </div>
    </div>
  </>
}

export default Mobile_KS_Query

const score_helper_css = (naviBarHeight: number) => css({
  width: "calc(100vw)",
  height: `calc(100vh - ${naviBarHeight}px)`,
  overflowX: "hidden",
  "& .phone_score_helper": {
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    "& .main_frame": {
      width: "100%",
      height: `calc(100% - ${pickerHeight}px)`,
      overflowX: "hidden",
      overflowY: "hidden",
    },
    "& .btm_picker": {
      width: "100%",
      height: `${pickerHeight}px`,
      overflowX: "hidden",
      overflowY: "hidden",
    },
  }
})
