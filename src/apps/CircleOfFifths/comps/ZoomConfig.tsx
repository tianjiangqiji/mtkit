/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import {clamp} from "lodash";
import {useWindowSize} from "react-use";
import {LuZoomOut} from "react-icons/lu";
import cssPresets from "@/assets/styles/cssPresets.ts";
import useCircleOfFifthsConfig from "@/assets/stores/useCircleOfFifthsConfig.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import {
  TbAlignBoxBottomCenter,
  TbAlignBoxLeftMiddle,
  TbAlignBoxRightMiddle,
  TbAlignBoxTopCenter,
  TbRefresh
} from "react-icons/tb";

const iconSize = 26
const iconActiveColor = googleColors.blue800
const iconActiveBgColor = googleColors.blue50
const iconInactiveColor = googleColors.gray400
const ZoomConfig = () => {
  const {
    resetCircle,
    isZoomIn,
    zoomLocation,
    setIsZoomIn,
    setZoomLocation,
    circleID,
    cursorID
  } = useCircleOfFifthsConfig()
  const {width} = useWindowSize()
  return <>
    <div css={ZoomConfig_css(width)}>
      <div className="inner_frame">
        <div className="icon" onClick={resetCircle}
             css={is_selected_css(!(isZoomIn || circleID !== 0 || cursorID !== 0))}>
          {!(isZoomIn || circleID !== 0 || cursorID !== 0) &&
              <LuZoomOut size={iconSize} color={!isZoomIn ? iconActiveColor : iconInactiveColor}/>}
          {(isZoomIn || circleID !== 0 || cursorID !== 0) && <TbRefresh size={iconSize} color={iconInactiveColor}/>}
        </div>
        <div className="icon"
             onClick={() => {
               setIsZoomIn(true)
               setZoomLocation("top")
             }}
             css={is_selected_css(isZoomIn && zoomLocation === "top")}>
          <TbAlignBoxBottomCenter size={iconSize}
                                  color={isZoomIn && zoomLocation === "top" ? iconActiveColor : iconInactiveColor}/>
        </div>
        <div className="icon"
             onClick={() => {
               setIsZoomIn(true)
               setZoomLocation("bottom")
             }}
             css={is_selected_css(isZoomIn && zoomLocation === "bottom")}>
          <TbAlignBoxTopCenter size={iconSize}
                               color={isZoomIn && zoomLocation === "bottom" ? iconActiveColor : iconInactiveColor}/>
        </div>
        <div className="icon"
             onClick={() => {
               setIsZoomIn(true)
               setZoomLocation("left")
             }}
             css={is_selected_css(isZoomIn && zoomLocation === "left")}>
          <TbAlignBoxLeftMiddle size={iconSize}
                                color={isZoomIn && zoomLocation === "left" ? iconActiveColor : iconInactiveColor}/>
        </div>
        <div className="icon"
             onClick={() => {
               setIsZoomIn(true)
               setZoomLocation("right")
             }}
             css={is_selected_css(isZoomIn && zoomLocation === "right")}>
          <TbAlignBoxRightMiddle size={iconSize}
                                 color={isZoomIn && zoomLocation === "right" ? iconActiveColor : iconInactiveColor}/>
        </div>
      </div>
    </div>
  </>
}

export default ZoomConfig
const is_selected_css = (isSelected: boolean) => css({
  backgroundColor: isSelected ? iconActiveBgColor : "white",
  "&:hover": {
    backgroundColor: isSelected ? iconActiveBgColor : googleColors.gray100,
  }
})
const ZoomConfig_css = (w: number) => css({
  marginLeft: "auto",
  marginRight: "auto",
  ...cssPresets.flexCenter,
  paddingLeft: 5,
  paddingRight: 5,
  width: "100%",
  "& .inner_frame": {
    ...cssPresets.flexCenter,
    width: "fit-content",
    marginTop: 10,
    borderRadius: 15,
    border: `1px solid ${googleColors.gray300}`,
    overflow: "hidden",
    "& .icon:not(:first-of-type)": {
      borderLeft: `1px solid ${googleColors.gray200}`,
    },
    "& .icon": {
      width: clamp(w / 5, 40, 80),
      height: 60,
      ...cssPresets.flexCenter,
      cursor: "pointer",
      boxSizing: "border-box",
      userSelect: "none",
      ...cssPresets.transition,
    }
  },

})
