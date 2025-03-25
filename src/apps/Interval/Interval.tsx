/* eslint-disable no-mixed-spaces-and-tabs */

import TabletIntervalBtmPicker from "@/apps/Interval/comps/TabletIntervalBtmPicker.tsx";
import TabletReverseInterval from "@/apps/Interval/comps/TabletReverseInterval.tsx";
import NotePicker from "@/components/reNote/NotePicker/NotePicker.tsx";
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import PhoneIntervalBtmPicker from "@/apps/Interval/comps/PhoneIntervalBtmPicker.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import PhoneNotesPanel from "@/apps/Interval/comps/PhoneNotesPanel.tsx";
import useIntervalConfig from "@/assets/stores/useIntervalConfig.ts";
import PhoneReverseInterval from "@/apps/Interval/comps/PhoneReverseInterval.tsx";
import {useEffect, useMemo} from "react";
import {useWindowSize} from "react-use";

const pickerHeight = 80
const Interval = () => {
  const globalSettings = useGlobalSettings();
  const intervalConfig = useIntervalConfig()
  const isWideScreen = useIsWideScreen();
  const {width, height} = useWindowSize()
  useEffect(() => {
    if (width <= 750 && isWideScreen) {
      intervalConfig.setIsDoubleAlterShown(false)
    } else if (width > 750 && isWideScreen) {
      intervalConfig.setIsDoubleAlterShown(true)
    }
  }, [intervalConfig, isWideScreen, width])
  const tablet_interval_frame_css = useMemo(() => {
    return {
      ...cssPresets.flexCenter as any,
      flexDirection: "column",
      transition: "all ease 0.5s",
      minHeight: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 494 : 331 : 0,
      height: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 494 : 331 : "fit-content",
      marginBottom: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? -20 : 0 : 0,
    }
  }, [globalSettings.intervalFunctionsFullHeight, height, intervalConfig.isReverse])
  const tablet_interval_css = useMemo(() => {
    return {
      maxHeight: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 800 : 0
        : 800,
      maxWidth: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 800 : 0
        : 800,
      transition: "all ease 0.3s",
      ...cssPresets.flexCenter,
      opacity: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 1 : 0
        : 1,
      transform: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? "scale(1)" : "scale(0) " : "scale(1)",
      transitionDelay: intervalConfig.isReverse ? "0.3s" : "0s",
      overflow: "hidden"
    }
  }, [globalSettings, height, intervalConfig])
  const tablet_reverse_interval_css = useMemo(() => {
    return {
      maxHeight: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 0 : 800
        : 800,
      maxWidth: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 0 : 800
        : 800,
      transition: "all ease 0.3s",
      ...cssPresets.flexCenter,
      opacity: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? 0 : 1
        : 1,
      transform: height <= globalSettings.intervalFunctionsFullHeight ?
        intervalConfig.isReverse ? "scale(0)" : "scale(1) " : "scale(1)",
      transitionDelay: intervalConfig.isReverse ? "0s" : "0.3s",
      overflow: "hidden"
    }
  }, [globalSettings.intervalFunctionsFullHeight, height, intervalConfig.isReverse])
  return <>
    <NotePicker/>
    {!isWideScreen && <div css={interval_phone_css(globalSettings.naviBarHeight)}>
      {intervalConfig.isReverse && <>
          <div className="main_frame">
            {(!isWideScreen && intervalConfig.isReverse) &&
                <PhoneNotesPanel isUpward={intervalConfig.isUpward}
                                 frameWidth={width}
                                 isAugDimShow={intervalConfig.isDoubleAlterShown}/>}
          </div>
          <div className="picker_frame">
            {!isWideScreen && <PhoneIntervalBtmPicker/>}
          </div>
      </>
      }
      {!intervalConfig.isReverse && <PhoneReverseInterval/>}
    </div>}
    {isWideScreen && <div css={interval_tablet_css(globalSettings.naviBarHeight)}>
        <div style={tablet_interval_frame_css}>
            <div className="interval_panels"
                 style={tablet_interval_css}>
                <PhoneNotesPanel isUpward={true} frameWidth={300}
                                 isAugDimShow={intervalConfig.isDoubleAlterShown}/>
                <PhoneNotesPanel isUpward={false} frameWidth={300}
                                 isAugDimShow={intervalConfig.isDoubleAlterShown}/>
            </div>
            <div className="interval_panels"
                 style={tablet_reverse_interval_css}>
                <TabletReverseInterval/>
            </div>
        </div>
        <div>
            <TabletIntervalBtmPicker/>
        </div>
    </div>}
  </>
}

export default Interval

const interval_phone_css = (windowH: number) => css({
  width: "calc(100vw)",
  height: `calc(100vh - ${windowH}px)`,
  overflowX: "hidden",
  overflowY: "hidden",
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .main_frame": {
    width: "100%",
    marginTop: 25,
    marginBottom: 25,
    ...cssPresets.flexCenter,
  },
  "& .picker_frame": {
    width: "100%",
    height: pickerHeight,
  }
})

const interval_tablet_css = (windowH: number) => css({
  width: "calc(100vw)",
  height: `calc(100vh - ${windowH}px)`,
  overflowX: "hidden",
  overflowY: "hidden",
  ...cssPresets.flexCenter,
  flexDirection: "column",
  "& .interval_panels": {
    marginLeft: "auto",
    marginRight: "auto",
    ...cssPresets.flexCenter,
    gap: 20,
    marginBottom: 20,
  }
})
