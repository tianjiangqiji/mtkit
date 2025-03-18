/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import useCircleOfFifthsConfig from "@/assets/stores/useCircleOfFifthsConfig.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import {useWindowSize} from "react-use";
import {gsap} from "gsap";
import {clamp, max, min} from "lodash";
import CircleSvg from "@/apps/CircleOfFifths/comps/CircleSvg.tsx";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import byDefault from "@/utils/byDefault.ts";


const CircleOfFifthsWindow = () => {
  const [zoomTranslate, setZoomTranslate] = useState(300)
  const {
    circleID,
    zoomValue,
    setZoomValue,
    translateX,
    translateY,
    setTranslateX,
    setTranslateY,
    zoomLocation,
    isZoomIn,
    resetCircle,
    cursorID,
    isCursorShow
  } = useCircleOfFifthsConfig();
  const ref = useRef(void 0)
  const circleFrameRef = useRef(void 0)
  const isWideScreen = useIsWideScreen();
  const {naviBarHeight} = useGlobalSettings()
  const {width, height} = useWindowSize()
  const circleFrameLength = useMemo(() => {
    return clamp(min([width, height - naviBarHeight - 150]), 0, 500)
  }, [width, height, naviBarHeight])

  //当五度圈轮转时，保持字符永远竖直向上
  useLayoutEffect(() => {
    gsap.to(ref.current, {
      rotation: circleID * 30
    })
    const selector = gsap.utils.selector(document); // 初始化选择器
    const elements = selector('g[id*="guohub"]');
    elements.forEach(element => {
      gsap.to(element, {
        rotation: circleID * -30,
        transformOrigin: "center center"
      })
    })
  }, [circleID]);


  // 作用是当zoom in时遇到改变窗口大小时，补偿五度圈移动的位置
  useEffect(() => {
    const length = byDefault(circleFrameRef.current.offsetWidth, width)
    setZoomTranslate(length / 2);
  }, [height, width])

  // 轮盘整体放大缩小的函数
  useLayoutEffect(() => {
    gsap.to(ref.current, {
      scale: zoomValue,
      x: translateX,
      y: translateY
    })
  }, [translateX, translateY, zoomValue])

  // 放大、缩小位置的函数
  useEffect(() => {
    if (isZoomIn) {
      setZoomValue(1.7)
      switch (zoomLocation) {
        case "top":
          setTranslateX(0)
          setTranslateY(min([width / 2, zoomTranslate]))
          return;
        case "bottom":
          setTranslateX(0)
          setTranslateY(max([width / -2, -1 * zoomTranslate]))
          return;
        case "left":
          setTranslateX(max([width / -2, -1 * zoomTranslate]))
          setTranslateY(0)
          return;
        case "right":
          setTranslateX(min([width / 2, zoomTranslate]))
          setTranslateY(0)
          return;
        default:
          return;
      }
    }
    resetCircle()

  }, [isZoomIn, resetCircle, setTranslateX, setTranslateY, setZoomValue, width, zoomLocation, zoomTranslate]);


  // 决定指针显示隐藏及位置的函数
  useEffect(() => {
    const selector = gsap.utils.selector(document); // 初始化选择器
    const cursorElement = selector('g[id="cursor"]');
    if (isCursorShow) {
      gsap.to(cursorElement, {
        opacity: 1
      })
    } else {
      gsap.to(cursorElement, {
        opacity: 0
      })
    }
    gsap.to(cursorElement, {
      rotation: cursorID * 30,
      transformOrigin: "center center"
    })
  }, [isCursorShow, cursorID])

  return <>
    <div css={circle_window_frame_css(circleFrameLength, isWideScreen)}>
      <div ref={circleFrameRef} className="circle_window">
        <CircleSvg ref={ref}/>
      </div>
    </div>
  </>
}

export default CircleOfFifthsWindow


const circle_window_frame_css = (w: number, isWideScreen: boolean) => css({
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  transition: "padding 0.3s ease-in-out",
  padding: isWideScreen ? 20 : 5,
  // backgroundColor: "red",
  ...cssPresets.flexCenter,
  overflow: "hidden",
  "& .circle_window": {
    width: "100%",
    maxWidth: w,
    maxHeight: w,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: googleColors.blueGray100
  },

})
