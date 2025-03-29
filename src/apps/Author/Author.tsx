/* eslint-disable no-mixed-spaces-and-tabs */
import {css} from "@emotion/react";
import useGlobalSettings from "@/assets/stores/useGlobalSettings.ts";
import cssPresets from "@/assets/styles/cssPresets.ts";
import {range} from "lodash"
import logo from "/svgs/logos/authorLogo.svg"
import googleColors from "@/assets/colors/googleColors.ts";
import {GiOgre} from "react-icons/gi";
import shadowPresets from "@/assets/styles/shadowPresets.ts";

const ma = {
  marginLeft: "auto", marginRight: "auto", userSelect: "none", paddingLeft: 15, paddingRight: 15, paddingTop: 5,
  paddingBottom: 5,
}
const Author = () => {
  const {naviBarHeight} = useGlobalSettings()
  return <>
    <div css={Author_css(naviBarHeight)}>
      <div className="i">
        <div className="avatar">
          <img src={logo} alt=""/>
        </div>
        <div style={{
          ...ma as any,
          fontSize: 22,
          marginTop: 10,
          backgroundColor: googleColors.blue100,
          width: "fit-content",
          borderRadius: 999,
          color: googleColors.blue800,
        }}>@方块郭
        </div>
        <div className="tags">
          <div>1996</div>
          <div>水瓶座</div>
          <div>INTP</div>
          <div>上班族</div>
          <div>宅男</div>
          <div>编程爱好者</div>
          <div>音乐爱好者</div>
          <div>设计爱好者</div>
          <div>桌游爱好者</div>
          <div>DIY爱好者</div>
        </div>
        <div className="intro">
          <div className="cap">
            <div className="title">Github</div>
            <div className="content">@guohub8080</div>
          </div>
          <div className="cap">
            <div className="title">电子邮箱</div>
            <div className="content">guo2018@88.com</div>
          </div>
          <div className="cap">
            <div className="title">微信公众号</div>
            <div className="content">@方块郭</div>
          </div>
          <div className="cap">
            <div className="title">个人主页</div>
            <div className="content">guohub.top</div>
          </div>
          <div className="cap">
            <div className="title">BiliBili</div>
            <div className="content">@方块郭</div>
          </div>
          <div className="cap">
            <div className="title">其他账号</div>
            <div className="content">无</div>
          </div>
        </div>
        <div className="beian">
          <div className="title">备案信息</div>
          <div className="content">京ICP备2023017358号-1</div>
        </div>

      </div>
    </div>
  </>
}

export default Author

const Author_css = (naviBarHeight: number) => css({
  width: "100%",
  height: `calc(100vh - ${naviBarHeight}px)`,
  overflow: "hidden",
  ...cssPresets.flexCenter,
  "& .i": {
    height: "calc(100% - 50px)",
    borderRadius: 8,
    width: "100%",
    maxWidth: 550,
    marginLeft: 25,
    marginRight: 25,
    overflowY: "auto",
    "& .avatar": {
      width: 80,
      height: 80,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 25,
      "&>img": {
        width: "100%",
        height: "100%",
        objectFit: "contain"
      }
    },
    "& .tags": {
      ...cssPresets.flexCenter,
      marginTop: 15,
      gap: 10,
      flexWrap: "wrap",
      "&>div": {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: "fit-content",
        backgroundColor: "white",
        borderRadius: 6,
        color: googleColors.blueGray700,
        fontSize: 14
      }
    },
    "& .intro": {
      ...cssPresets.flexCenter,
      flexWrap: "wrap",
      marginTop: 25,
      marginBottom: 25,
      gap: 15,
      "& .cap": {
        width: 200,
        height: 100,
        backgroundColor: googleColors.gray100,
        ...cssPresets.flexCenter,
        flexDirection: "column",
        borderRadius: 8,
        border: `1px solid ${googleColors.gray300}`,
        boxShadow:shadowPresets.sm,
        "& .title": {
          fontSize: 18,
          color: googleColors.gray800,
          width: 120,
          paddingLeft: 15,
          paddingRight: 15,
          marginLeft: "auto",
          marginRight: "auto",
          // borderBottom:`8px solid ${googleColors.blue800}`
        },
        "& .content": {
          marginLeft: "auto",
          marginRight: "auto",
          ...ma as any,
          width: "fit-content",
          backgroundColor: "white",
          borderRadius: 999,
          color: googleColors.blue800,
          background: googleColors.blue50,
          border: `1px solid ${googleColors.blue500}`,
          marginTop: 5
        }
      }
    },
    "& .beian": {
      width: "100%",
      marginTop:50,
      marginBottom:50,
      textAlign: "center",
      fontSize: 14,
      "& .title": {
        fontSize:20,
        color: googleColors.gray600
      },
      "& .content": {
        ...ma as any,
        backgroundColor:googleColors.red300,
        color:googleColors.amber200,
        width: 250,
        borderRadius: 999,
        marginTop:5
      }
    }
  }
})
