/* eslint-disable no-mixed-spaces-and-tabs */

import {css} from "@emotion/react";
import naviConfig from "@/router/naviConfig.ts";
import WideScreenNaviItem from "@/components/reFrame/NaviBar/comps/WideScreenNaviItem.tsx";
import text_logo_full from "@/assets/svgs/logos/TextLogoFull.svg";
import logo from "@/assets/svgs/logos/Production.svg";
import cssPresets from "@/assets/styles/cssPresets.ts";
import googleColors from "@/assets/colors/googleColors.ts";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import {useWindowSize} from "react-use";
import {useMemo} from "react";
import BlankWideScreenNaviItem from "@/components/reFrame/NaviBar/comps/BlankWideScreenNaviItem.tsx";

const headHeight = 120;
const WideScreenPopNaviContent = () => {
  const globalSettings = useGlobalSettings();
  const closeNaviWindow = () => {
    globalSettings.setNaviWindowOpen(false);
  }
  const {width} = useWindowSize()
  const realConfig = useMemo(() => {
    const result = naviConfig.filter(x => ["all", "tablet"].includes(x.type))
//如果result是双数，就直接return result
    if (result.length % 2 === 0) {
      return result
    }
    return [...result, {
      isEmpty: true,
      title: "",
      subtitle: "",
      link: "",
      imgURL: "",
    }]
  }, [])
  return <div css={tablet_mask_content_css}>
    <div className="text_logo" onClick={closeNaviWindow}>
      <img src={logo} alt=""/>
      <img src={text_logo_full} alt=""/>
    </div>
    <div className="navi_items" onClick={closeNaviWindow}>
      {realConfig.map((x, y) => {
          if (x["isEmpty"]) return <BlankWideScreenNaviItem itemH={70} itemW={250}/>
          return <div className="each_item" key={y}>
            <WideScreenNaviItem
              itemH={70}
              itemW={250}
              iconH={40}
              subtitle={x.subtitle}
              title={x.title}
              link={x.link}
              url={x.imgURL}/>
          </div>
        }
      )}
    </div>
  </div>
}

export default WideScreenPopNaviContent

const tablet_mask_content_css = css({
  width: 501,
  overflowX: "hidden",
  overflowY: "hidden",
  backgroundColor: "white",
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  overflow: "hidden",
  "& .text_logo": {
    boxSizing: "border-box",
    width: "100%",
    height: headHeight,
    ...cssPresets.flexCenter,
    backgroundColor: googleColors.blueGray50,
    "& img:first-of-type": {
      height: 50,
      width: "auto",
      marginRight: 5,
    }, "& img:last-of-type": {
      height: 50,
      width: "auto"
    },
  },
  "& .navi_items": {
    // width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    width: "auto",
    ...cssPresets.flexCenter,
    boxSizing: "border-box",
    flexWrap: "wrap",
    // "&>div": {
    //   borderTop: "1px solid #e5e5e5",
    // }
    "& .each_item": {
      borderBottom: `1px solid ${googleColors.gray200}`,
    },
    "& .each_item:nth-of-type(2n+1)": {
      borderRight: `1px solid ${googleColors.gray200}`,
    }, "& .each_item:nth-of-type(2n)": {},
  },

})
