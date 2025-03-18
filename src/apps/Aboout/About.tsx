/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import logo from "@/assets/svgs/logos/Production.svg";
import text_logo from "@/assets/svgs/logos/TextLogoFull.svg";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import guohub8080 from "@/assets/svgs/logos/authorLogo.svg";
import collect from "collect.js";
import {useMemo} from "react";
import UseResetAllStores from "@/assets/stores/useResetAllStores.tsx";
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from "react-router-dom";

const citeItems = [
  "jzz.js",
  "React",
  "@emotion/react",
  "typescript",
  "antd-mobile",
  "antd-mobile-icons",
  "vite",
  "vitest",
  "@vitejs/plugin-react",
  "power-radix",
  "verovio",
  "abcjs",
  "lodash",
  "ramda",
  "collect.js",
  "immer",
  "react-use",
  "react-icons",
  "react-router",
  "react-router-dom",
  "usehooks-ts",
  "webmidi",
  "zustand",
  "react-error-boundary",
  "@svgr/core",
  "react-device-detect",
  "tone",
  "midi",
  "midi-player-js",
  "webaudiofont",
  "@midival/core",
  "jzz-synth-tiny",
  "base64-arraybuffer",
  "gsap",
  "svg.js",
  "OSMD",
  "vexflow",
  "react-toastify",
  "react-hot-toast"
];
const About = () => {

  const i = useMemo(() => {
    return collect(citeItems).shuffle().all()
  }, [])
  const {resetAll} = UseResetAllStores()
  const navigate = useNavigate()
  const reset = () => {
    resetAll()
    toast.success('重置成功');
    setTimeout(() => {
      navigate("/", {replace: true})
    }, 2000)
  }
  const {naviBarHeight} = useGlobalSettings()
  return <div css={frame_css(naviBarHeight)}>
    <Toaster/>
    <div className="inner_frame">
      <div className="logo_frame">
        <img src={logo} alt=""/>
      </div>
      <div className="text_logo_frame">
        <img src={text_logo} alt=""/>
      </div>
      <div className="cite_title">当前版本</div>
      <div className="cite_frame">
        <div className="cite_item">v147.2.1</div>
      </div>
      <div className="cite_title">作者Js库</div>
      <div className="cite_frame">
        <div className="cite_item">music12.js</div>
      </div>
      <div className="cite_title">引用Js库</div>
      <div className="cite_frame">
        {i.map((item, index) => (
          <div className="cite_item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="cite_title">项目协议</div>
      <div className="cite_frame">
        <div className="cite_item">GPL-3.0</div>
      </div>
      <div className="reset">
        <div className="reset_desc">
          <span style={{whiteSpace: "nowrap"}}>如果该项目出现问题，</span>
          <span style={{whiteSpace: "nowrap"}}>可通过重置按钮</span>
          <span style={{whiteSpace: "nowrap"}}>恢复到初始状态。</span>
        </div>
        <div className="btn" onClick={reset}>重置应用</div>
      </div>
      <div style={{marginTop: 50, marginBottom: 100, width: '100%', height: 45}}>
        <img src={guohub8080} style={{
          height: "100%", width: "auto",
          //drop shadow
          filter: "drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.2))"
        }} alt=""/>
      </div>
    </div>

  </div>
}

export default About

const frame_css = (naviBarHeight: number) => css({
  width: "100%",
  height: `calc(100vh - ${naviBarHeight}px)`,
  overflowX: "hidden",
  overflowY: "auto",
  paddingLeft: 25, paddingRight: 25,
  userSelect: "none",
  touchAction: "auto",
  "& div": {
    userSelect: "none",
    fontFamilyL: "misans-m",
  },
  "& .reset": {
    width: "100%",
    height: 150,
    userSelect: "none",
    ...cssPresets.flexCenter,
    flexDirection: "column",
    marginTop: 25,
    "& .reset_desc": {
      fontSize: 14,
      color: googleColors.gray400,
      userSelect: "none",
      marginLeft: 40,
      marginRight: 40,
    },
    "& .btn": {
      width: 150,
      height: 60,
      userSelect: "none",
      ...cssPresets.flexCenter,
      backgroundColor: googleColors.red300,
      borderRadius: 8,
      fontSize: 20,
      marginTop: 15,
      cursor: "pointer",
      ...cssPresets.transition,
      color: googleColors.red50,
      "&:hover": {
        backgroundColor: googleColors.red400,
      },
      "&:active": {
        backgroundColor: googleColors.red800,
      },
    }
  },
  "& .inner_frame": {
    boxSizing: "border-box",
    touchAction: "auto",
    width: "100%",
    maxWidth: 650,
    userSelect: "none",
    margin: "0 auto",
    height: `calc(100vh - ${naviBarHeight + 30}px)`,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 8,
    overflowX: "hidden",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    "& .logo_frame": {
      userSelect: "none",
      width: "100%",
      height: 50,
      marginTop: 40,
      marginBottom: 10,
      ...cssPresets.flexCenter,
      "& img": {
        width: "100%",
        height: "100%",
        userSelect: "none",
      }
    },
    "& .text_logo_frame": {
      userSelect: "none",
      width: "100%",
      // the font size of the logo:
      height: 70,
      ...cssPresets.flexCenter,
      marginBottom: 20,
      "& img": {
        width: "100%",
        height: "100%",
        userSelect: "none",
      }
    },
    "& .items": {
      ...cssPresets.flexCenter,
      flexWrap: "wrap",
      userSelect: "none",
    }
  },
  "& .cite_title": {
    fontFamily: "misans-m",
    fontSize: 16,
    width: "fit-content",
    margin: "0 auto",
    marginBottom: 15,
    userSelect: "none",
    marginTop: 45,
    paddingLeft: 20, paddingRight: 20,
    color: googleColors.blue800,
    borderBottom: `6px solid ${googleColors.blue800}`,
    paddingTop: 10, paddingBottom: 2,
    // backgroundColor: "#eee",
  },
  "& .cite_frame": {
    marginLeft: 15, marginRight: 15,
    ...cssPresets.flexCenter,
    fontFamily: "misans-m",
    userSelect: "none",
    gap: 10,
    flexWrap: "wrap",
    "& .cite_item": {
      width: "fit-content",
      ...cssPresets.flexCenter,
      padding: "5px 15px ",
      userSelect: "none",
      borderRadius: 999,
      fontSize: 14,
      backgroundColor: googleColors.gray100,
      border: `1px solid ${googleColors.gray300}`
    }
  }
})
