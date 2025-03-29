/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from 'react';
import {useLocation} from "react-router-dom";
import {css} from "@emotion/react";
import {Popup} from "antd-mobile";
import cssPresets from "@/assets/styles/cssPresets.ts";
import naviConfig from "@/router/naviConfig.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import useIsWideScreen from "@/utils/useIsWideScreen.tsx";
import PhonePopNaviContent from "@/components/reFrame/NaviBar/comps/PhonePopNaviContent.tsx";
import WideScreenPopNaviContent from "@/components/reFrame/NaviBar/comps/WideScreenPopNaviContent.tsx";
import pure_text_logo from "/public/svgs/logos/TextLogo.svg";
import production from "/public/svgs/logos/Production.svg";

const naviWindowHeight = 40
const naviWindowIconSize = 25
const maskStyle = {backgroundColor: "#000000aa", ...cssPresets.defaultBlur}
const NaviBar: React.FunctionComponent = () => {
  const globalSettings = useGlobalSettings()
  const isWideScreen = useIsWideScreen();
  const location = useLocation().pathname;
  const naviWindowHandle = naviConfig.filter(x => x.link === location)[0]
  return (
    <>
      {/*Wide Screen Popup*/}
      {isWideScreen && <Popup
          maskStyle={maskStyle}
          destroyOnClose={true}
          visible={globalSettings.isNaviWindowOpen}
          position='top'
          onClick={() => globalSettings.setNaviWindowOpen(false)}
          bodyStyle={{...cssPresets.flexCenter, background: "none"}}
          onMaskClick={() => globalSettings.setNaviWindowOpen(false)}>
          <WideScreenPopNaviContent/>
      </Popup>}
      {/*Phone Screen Popup*/}
      {!isWideScreen && <Popup
          maskStyle={maskStyle}
          visible={globalSettings.isNaviWindowOpen}
          onMaskClick={() => globalSettings.setNaviWindowOpen(false)}
          position='left'>
          <PhonePopNaviContent/>
      </Popup>}
      {/*Navigator Bar*/}
      <div css={navigate_window_css}>
        <div style={{
          width: "auto",
          height: "100%",
          marginRight: "auto", ...cssPresets.flexCenter,
          justifyContent: "start"
        }}>
          <img src={production} style={{height:25, marginRight: 1, width: "auto"}} alt=""/>
          <img src={pure_text_logo} style={{height: 22, width: "auto"}} alt=""/>
        </div>
        <div className="icon_img">
          <img src={naviWindowHandle.imgURL} alt=""/>
        </div>
        <div className="title">{naviWindowHandle.title}</div>
      </div>
    </>
  );
}

export default NaviBar;

const navigate_window_css = css({
  backgroundColor: "white",
  height: "100%",
  userSelect: "none",
  maxWidth: 650,
  width: "100%",
  cursor: "pointer",
  paddingLeft:15,
  paddingRight:15,
  ...cssPresets.flexCenter,
  "&:active": {
    backgroundColor: googleColors.gray100,
    transition: "all ease 0.2s"
  },
  "& .icon_img": {
    width: naviWindowIconSize,
    height: naviWindowIconSize,
    "& img": {
      width: "100%",
      height: "100%",
    }
  },
  "& .title": {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "misans-m"
  }
})
